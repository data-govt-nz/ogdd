import labels from 'text/labels.json';

export default function getLabel(id) {
  return labels[id] || null;
}
