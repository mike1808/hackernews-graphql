const fs = require('fs').promises;
const path = require('path');

const User = require('mongoose').model('User');
const Item = require('mongoose').model('Item');

module.exports = async function() {
  const dir = path.resolve(__dirname, '../dump');
  const fileNames = await fs.readdir(dir);
  const files = await Promise.all(
    fileNames.map(fileName => fs.readFile(path.join(dir, fileName)))
  );
  const jsons = files.map(file => JSON.parse(file));

  const usersData = {};
  const postsData = [];
  jsons.forEach(json => {
    usersData[json.by] = json.by;
    if (json.type === 'story' && json.url) {
      postsData.push({
        url: json.url,
        title: json.title,
        by: json.by,
        type: 'LINK',
      });
    }
  });

  const users = await User.create(
    Object.keys(usersData).map(k => ({ username: k }))
  );

  postsData.forEach(post => {
    post.by = users.find(u => u.username === post.by)._id;
  });

  await Item.create(postsData);
};
