/**
 * 堆（顺序存储）以大顶堆为例讲解
*/
class Heap {
  //初始化函数，传入数组和，比较函数，可生成大顶堆或小顶堆，默认大顶堆
  constructor(arr = [], compare = (a, b) => a > b) {
    this.arr = arr
    this.compare = compare
    // 初始化堆
    this.heapify()
  }

  // 初始化建堆
  heapify() {
    if (this.size() <= 1) return
    for (let i = 1; i < this.size(); i++) {
      this.bubbleUp(i)
    }
  }

  // 返回数组元素个数
  size() {
    return this.arr.length
  }

  // 返回堆顶元素
  top() {
    if (!this.size()) return null
    return this.arr[0]
  }

  // 从堆尾添加元素
  push(value) {
    this.arr.push(value)
    // 向上调整
    this.bubbleUp(this.size() - 1)
  }

  // 从堆顶取出元素
  pop() {
    if (!this.size()) return null
    if (this.size() === 1) return this.arr.pop()
    const top = this.arr[0]
    // 取出堆尾元素，代替堆顶元素
    this.arr[0] = this.arr.pop()
    // 向下调整
    this.bubbleDown(0)
    return top;
  }

  // 向上调整
  bubbleUp(index) {
    // 当元素没到堆顶就可以继续调整
    while (index) {
      // 父节点的位置 = (当前元素节点位置 - 1) / 2
      const parentIndex = Math.floor((index - 1) / 2)
      // 比较当前节点和父节点大小，如果当前节点大，则交换位置
      if (this.compare(this.arr[index], this.arr[parentIndex])) {
        [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]]
        index = parentIndex
      } else {
        // 如果小于或等于父节点，证明调整结束，跳出循环
        break;
      }
    }
  }

  // 向下调整
  bubbleDown(index) {
    // 记录最后节点位置
    const lastIndex = this.size() - 1
    // 当前节点位置没到最尾就可以继续向下调整
    while (index < lastIndex) {
      // 记录当前节点的位置
      // 左孩子节点的位置 = 当前节点位置 * 2 + 1
      // 右孩子节点的位置 = 当前节点位置 * 2 + 2
      let findIndex = index,
        leftIndex = index * 2 + 1,
        rightIndex = index * 2 + 2
      // 如果还没超出下限，比较当前节点跟左右孩子节点的大小，当前节点小的话就要交换位置（大顶堆）
      if (leftIndex <= lastIndex && this.compare(this.arr[leftIndex], this.arr[findIndex])) {
        findIndex = leftIndex
      }
      if (rightIndex <= lastIndex && this.compare(this.arr[rightIndex], this.arr[findIndex])) {
        findIndex = rightIndex
      }
      // 如果有调整过，那就交换位置
      if (findIndex > index) {
        [this.arr[findIndex], this.arr[index]] = [this.arr[index], this.arr[findIndex]]
        index = findIndex
      } else {
        break;
      }
    }
  }

  // 小顶堆
  exchange(value) {
    if (!this.size()) return null
    if (this.compare(value, this.arr[0])) return;
    // 如果比堆顶元素大，替换并更新堆
    this.arr[0] = value
    // 向下调整
    this.bubbleDown(0)
    return;
  }
}

module.exports = Heap