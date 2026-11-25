import { sortArray } from "./sortArray";

export function sortArrayByAlphabet(tagsArray) {
  const tags = new Set();
  const sort = sortArray();

  sort.forEach(s => {
    const key = s.toUpperCase();
    const filteredTags = []

    for (let index in tagsArray) {
        const tag = tagsArray[index];

        if (tag.name.toUpperCase()[0] === key) {
            filteredTags.push(tag)
        }
    }

    const obj = {};

    obj.key = key;
    obj.values = filteredTags;

    tags.add(obj);
  })

  return tags;
}