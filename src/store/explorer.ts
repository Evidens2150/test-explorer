import { defineStore } from 'pinia'

function reindexItemChildrens(item) {
  let count = 1
  for (let i = 0; i < item.children.length; i++) {
    const prefix = !item.id ? '' : item.id + '-'
    item.children[i].id = prefix + count
    if(!!item.children[i].children?.length) {
      reindexItemChildrens(item.children[i])
    }
    count++
  }
}
function deleteItemById(tree, id) {
  for (let item of tree) {
    const isCorrectParent = !item.id || item.id === id.split('-').slice(0, -1).join('-')
    if (isCorrectParent && item.children && item.children.length > 0) {
      const oldLength = item.children.length
      item.children = item.children.filter(child => child.id !== id);
      if (item.children.length === oldLength) {   
        deleteItemById(item.children, id);
      } else {     
        reindexItemChildrens(item)
      }
    }
  }
}
function findItemById(tree, id) {
  for (let item of tree) {
    if (item.id === id) {
      return item;
    } else if (item.children && item.children.length > 0) {
      const foundItem = findItemById(item.children, id);
      if (!!foundItem) {
        return foundItem;
      }
    }
  }
  return null;
}

export const useFileSystemStore = defineStore('fileSystem', {
  state: () => ({
    fileTreeData: [
        { id: "1", name: "Dir 1", type: "folder", children: [{ id: "1-1", name: "Dir 1-1", type: "folder", children: [{ id: "1-1-1", name: "File 1-1-1", type: "file" }] }] },
        { id: "2", name: "Dir 2", type: "folder", children: [{ id: "2-1", name: "Dir 2-1", type: "folder", children: [] }, { id: "2-2", name: "File 2-2", type: "file" }] },
        { id: "3", name: "File 2", type: "file" }
      ]
  }),
  actions: {
    addItem(type, id) {
      const newItem = {
        name: 'new-' + type, type
      }
      if (type === 'folder') {
        newItem.children = []
      }
      if (!id) {
        newItem.id = this.fileTreeData.length + 1
        this.fileTreeData.push(newItem)
        return
      }
      const currentItem = findItemById(this.fileTreeData, id);
      if (!currentItem) {
        return
      }
      newItem.id = id + '-' + (currentItem.children.length + 1)
      currentItem.children.push(newItem);
    },
    deleteItem(id) {
      const updatedTreeData = [{children: JSON.parse(JSON.stringify(this.fileTreeData))}]
      deleteItemById(updatedTreeData, id);
      this.fileTreeData = updatedTreeData[0].children
      
    },
    renameItem(id, newName) {
      const currentItem = findItemById(this.fileTreeData, id);
      if (!currentItem) {
        return
      }
      currentItem.name = newName
    }
  },
  getters: {
    getFileTreeData: (state) => state.fileTreeData
  }
})