/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var reverseBetween = function (head, left, right) {
    // 1
    const dummy_node = new ListNode(-1);
    dummy_node.next = head;
    // 2
    let pre = dummy_node;
    for (let i = 0; i < left - 1; ++i) {
        pre = pre.next;
    }
    // 3
    let cur = pre.next;
    for (let i = 0; i < right - left; i++) {
        const next = cur.next;
        // next.next = cur
        cur.next = next.next; // 3->2
        next.next = pre.next; // 
        pre.next = next;
        console.log(dummy_node)
    }
    return dummy_node.next;
};
// 1，2，3，4，5
// 1，2，4，3，5

var partition = function (head, x) {
    let small = new ListNode(0);
    const smallHead = small;
    let large = new ListNode(0);
    const largeHead = large;
    while (head !== null) {
        if (head.val < x) {
            small.next = head;
            small = small.next;
        } else {
            large.next = head;
            large = large.next;
        }
        head = head.next;
    }
    large.next = null;
    small.next = largeHead.next;
    return smallHead.next;
};

// 输入：head = [1,4,3,2,5,2], x = 3
// 输出：[1,2,2,4,3,5]
var partition = function (head, x) {
    // 哨兵节点
    let less = new ListNode(0)
    let lessHead = less
    // 哨兵节点
    let more = new ListNode(0)
    let moreHead = more
    let cur = head
    while (cur) {
        if (cur.val < x) {
            less.next = cur
            less = less.next
        } else {
            more.next = cur
            more = more.head
        }
        cur = cur.next
    }

};