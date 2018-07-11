import labels from 'labels/labels.json';

export default function getLabel(id) {
  return labels[id] || id;
}
