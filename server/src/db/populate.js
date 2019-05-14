import { promises as fs } from 'fs';
import path from 'path';
import { Item, User, Vote } from './models';

export default async function() {
  const dir = path.resolve(__dirname, '../../dump');
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

  await User.collection.insert(
    Object.keys(usersData).map(k => ({ username: k }))
  );

  const users = await User.find();

  postsData.forEach(post => {
    post.by = users.find(u => u.username === post.by)._id;
  });

  await Item.collection.insert(postsData);

  const items = await Item.find();

  const votes = [];

  let userIndex = 0;

  items.forEach(item => {
    const score = Math.floor(Math.random() * 100) - 20;

    votes.push(
      ...new Array(Math.abs(score)).fill().map(() => ({
        item: item._id,
        by: users[userIndex++ % users.length]._id,
        type: score > 0 ? 1 : 1,
      }))
    );
  });

  await Vote.collection.insert(votes);
}
