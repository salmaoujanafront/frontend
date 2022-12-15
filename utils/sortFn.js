export default function sortItems (sort, items) {
    if(!sort) return items;

    return items.sort((a, b) => sort === 'aToZ' ? a.name.toLowerCase().localeCompare(b.name.toLowerCase()) : b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
}