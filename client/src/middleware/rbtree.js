class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.tf = false;
    this.left = null;
    this.right = null;
  }
}

export class Rbtree {
  constructor(arr) {
    this.head = null;
    this.length = 0;
    this.arr = arr;
  }

  mergeSort(arr) {
    if (arr.length == 1) return arr;

    let mid = Math.floor(arr.length / 2);

    let left = this.mergeSort(arr.slice(0, mid));
    let right = this.mergeSort(arr.slice(mid, arr.length));

    let i = 0;
    let j = 0;

    let result = [];
    while (true) {
      if (i >= left.length && j >= right.length) return result;
      else if (i >= left.length) {
        result.push(right[j]);
        j++;
      } else if (j >= right.length) {
        result.push(left[i]);
        i++;
      } else {
        if (left[i].data < right[j].data) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
    }
  }

  colorChange(arr) {
    for (var i = 0; i < arr.length; i++) {
      let info = arr[i];
      if (info.length == 1) {
        info[0].tf = !info[0].tf;
      } else {
        info[0].tf = info[1] == "r" ? false : true;
      }
    }
  }
  swap(cur, curpa) {
    if (this.head.data == curpa.data) this.head = cur;
    else {
      curpa.parent.data > curpa.data
        ? (curpa.parent.left = cur)
        : (curpa.parent.right = cur);
    }

    if (cur.data > curpa.data) {
      cur.parent = curpa.parent;
      curpa.right = cur.left;

      curpa.parent = cur;
      cur.left = curpa;
      if (curpa.right) curpa.right.parent = curpa;
    } else {
      cur.parent = curpa.parent;
      curpa.left = cur.right;

      curpa.parent = cur;
      cur.right = curpa;

      if (curpa.left) curpa.left.parent = curpa;
    }
  }

  insertValidate(node) {
    let current = node;

    while (!current.tf && current.parent && !current.parent.tf) {
      let papa = current.parent.parent;
      let pa = current.parent;
      let uncle = papa.data > pa.data ? papa.right : papa.left;

      if (!uncle || uncle.tf) {
        let arr = [current, papa, pa];
        arr = this.mergeSort(arr).map((val) => val);

        let count = arr[1].data == pa.data ? 1 : 2;
        this.colorChange([[papa], [arr[1]]]);

        let cur = arr[1];

        while (count) {
          this.swap(cur, cur.parent);
          count -= 1;
        }
        current = arr[1];
      } else {
        this.colorChange([[pa], [uncle], [papa]]);
        current = papa;
      }

      this.head.tf = true;
    }
  }

  deleteValidate(dn, sn, snp) {
    let pos = "";
    if (dn.data == sn.data) {
      snp.data < sn.data ? (snp.right = sn.right) : (snp.left = sn.right);
      pos = snp.data < sn.data ? "r" : "l";
      if (!dn.tf) return;
    } else {
      dn.data = sn.data;
      snp.data < sn.data ? (snp.right = sn.left) : (snp.left = sn.left);
      pos = snp.data < sn.data ? "r" : "l";
      if (!sn.tf) return;
    }
    let check = pos == "r" ? snp.right : snp.left;
    if (check) {
      check.parent = snp;
      check.tf = true;
      return;
    }

    pos = pos == "r" ? "l" : "r";

    let current = snp;
    let btn = [true, true];
    while (btn[0] || btn[1]) {
      if (this.head) this.head.tf = true;
      btn[1] = true;
      let redCount = 0;
      let curpa = current.parent;
      let child = pos == "l" ? current.left : current.right;

      if (!btn[0]) {
        let ar = [current.left, current.right];
        let far = ar.filter((val) => val);
        if (far.length == 1) {
          if (!far[0].tf) return;
        } else return;
      }

      if (current.data == this.head.data) btn[0] = false;

      let arr =
        pos == "l"
          ? [current, child, child.left, child.right]
          : [current, child, child.right, child.left];

      let farr = [];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          farr.push(arr[i]);
          if (!arr[i].tf) redCount += 1;
        }
      }

      // 부모 자식만 있는 경우
      if (farr.length == 2)
        this.colorChange([
          [current, "b"],
          [farr[1], "r"],
        ]);
      // 부모 자식 조카 있는경우
      else if (farr.length == 3) {
        let count = 0;
        farr.sort((a, b) => a.data - b.data);

        count = child.data == farr[1].data ? 1 : 2;

        this.colorChange(
          redCount == 2
            ? [
                [farr[1], "r"],
                [farr[0], "b"],
                [farr[2], "b"],
              ]
            : [
                [farr[1], "b"],
                [farr[0], "b"],
                [farr[2], "b"],
              ]
        );

        while (count) {
          this.swap(farr[1], farr[1].parent);
          count -= 1;
        }
      }

      // 부모 자식 조카1,2 있는 경우
      else {
        // 검정색만 있을때
        if (redCount == 0) {
          // console.log("하위");
          this.colorChange([[child]]);
        }
        // 빨강이 1개 있을때
        else if (redCount == 1) {
          if (farr[0].tf == false) {
            this.colorChange([
              [farr[0], "b"],
              [farr[1], "r"],
            ]);
          } else if (farr[1].tf == false) {
            this.colorChange([
              [farr[1], "b"],
              [farr[0], "r"],
            ]);
            this.swap(child, current);
          } else if (farr[2].tf == false) {
            this.colorChange([[farr[2], "b"]]);
            this.swap(child, current);
          } else {
            let c = 2;
            this.colorChange([[farr[3], "b"]]);
            while (c) {
              this.swap(farr[3], farr[3].parent);
              c -= 1;
            }
          }
        }
        // 빨강이 2개 있을때
        else if (redCount == 2) {
          if (!current.tf == false) {
            this.colorChange([[farr[2], "b"]]);
            this.swap(child, current);
          } else {
            let c = farr[2].tf == false ? 1 : 2;
            this.colorChange(
              c == 1
                ? [
                    [farr[1], "r"],
                    [farr[0], "b"],
                    [farr[2], "b"],
                  ]
                : [[farr[0]]]
            );
            const tar = c == 2 ? farr[3] : farr[1];
            while (c) {
              this.swap(tar, tar.parent);
              c -= 1;
            }
          }
        }
        // 빨강이 3개 있을때
        else {
          this.colorChange([
            [farr[0], "b"],
            [farr[1], "r"],
            [farr[2], "b"],
            [farr[3], "r"],
          ]);
          this.swap(child, current);
        }
      }

      if (redCount) btn[0] = false;

      if (btn[0]) {
        pos = curpa.data > current.data ? "r" : "l";
        current = curpa;
      }

      // current
      // pos
      // button
    }
  }

  insert(data) {
    this.length += 1;
    let newNode = new Node(data);

    // 일단 최상위 노드가 없으면 먼저 넣고 끝낸다
    if (this.head == null) {
      newNode.tf = true;
      this.head = newNode;
      return;
    }

    let current = this.head;

    while (true) {
      let lr = data < current.data ? "l" : "r";
      let val = data < current.data ? current.left : current.right;

      if (!val) {
        newNode.parent = current;
        lr == "l" ? (current.left = newNode) : (current.right = newNode);
        this.insertValidate(newNode);
        break;
      } else current = lr == "l" ? current.left : current.right;
    }
    return this.lists();
  }
  modify() {}
  delete(data) {
    this.length -= 1;
    // dn 삭제될 노드
    // sn 스왑할 노드
    // snp 스왑할 노드의 부모노드
    let dn = this.head;

    while (dn.data !== data) dn = data < dn.data ? dn.left : dn.right;

    let sn = dn;
    let first = false;

    if (sn.left) {
      first = true;
      sn = sn.left;
    }

    while (first && sn.right) sn = sn.right;

    let snp;
    // 본인이 스왑 그 자체일때
    if (dn.data == sn.data) {
      if (this.head.data == dn.data) {
        this.head = this.head.right;
        if (this.head) {
          this.head.parent = null;
          this.head.tf = true;
        }
        return;
      } else {
        snp = sn.parent;
      }
    } else if (dn.left && dn.left.data == sn.data) snp = dn;
    else snp = sn.parent;
    this.deleteValidate(dn, sn, snp);
    return this.lists();
  }

  lists() {
    let result = [];

    let status = true;
    let stack = [[this.head]];
    while (result.length < this.length) {
      let ls = stack[stack.length - 1];
      // status 가 트루
      if (status) {
        while (true) {
          let cur = ls[ls.length - 1];
          if (!cur.left) break;

          ls.push(cur.left);
        }
        status = false;
      }
      // status 뻘스
      else {
        while (ls.length) {
          let cur = ls.pop();
          result.push(cur);

          if (cur.right) {
            if (ls.length == 0) stack.pop();
            stack.push([cur.right]);
            status = true;
            break;
          }
          if (ls.length == 0) stack.pop();
        }
      }
    }
    this.arr = result.map((val) => val);
    return new Rbtree(this.arr);
  }
}
