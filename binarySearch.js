(function(){

    function BinarySearchTree() {
        var Node = function(key){
            this.key = key;
            this.left = null;
            this.right = null;
        };

        var root = null;
        var insertNode = function(node, newNode){
            if (newNode.key < node.key) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    insertNode(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    insertNode(node.right, newNode);
                }
            }
        };

        var traverseNode = function(type, node, callback) {
            return ({
                'in' : function(node, callback){
                    if (node !== null){
                        traverseNode('in', node.left, callback);
                        callback(node.key);
                        traverseNode('in', node.right, callback);
                    }
                },
                'pre' : function(node, callback){
                    if (node !== null){
                        callback(node.key);
                        traverseNode('pre', node.left, callback);
                        traverseNode('pre', node.right, callback);
                    }
                },
                'post' : function(node, callback){
                    if (node !== null){
                        traverseNode('post', node.left, callback);
                        traverseNode('post', node.right, callback);
                        callback(node.key);
                    }
                }
            })[type](node, callback);
        };

        this.insert = function(key){
            var newNode = new Node(key);

            if (root === null) {
                root = newNode;
            } else {
                insertNode(root, newNode);
            }
        };

        this.traverse = function(callback, type) {
            traverseNode(type || 'in', root, callback);
        };
    }

    var tree = new BinarySearchTree();
    tree.insert(11);
    tree.insert(1);
    tree.insert(17);
    tree.insert(9);
    tree.insert(7);
    tree.insert(27);
    tree.insert(29);

    function printNode(value) {
        console.log(value);
    }

    tree.traverse(printNode, 'post');
}());