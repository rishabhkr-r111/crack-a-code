import { useState, useEffect, useRef } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';

export default function CodeBox() {
  const py_code = `# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x;
#         self.next = None;

def stringToListNode(input):
    # Generate list from the input
    numbers = json.loads(input)

    # Now convert that list into linked list
    dummyRoot = ListNode(0)
    ptr = dummyRoot
    for number in numbers:
        ptr.next = ListNode(number)
        ptr = ptr.next

    ptr = dummyRoot.next
    return ptr

def prettyPrintLinkedList(node):
    import sys
    while node and node.next:
        sys.stdout.write(str(node.val) + "->")
        node = node.next

    if node:
        print(node.val)
    else:
        print("Empty LinkedList")

def main():
    import sys

    def readlines():
        for line in sys.stdin:
            yield line.strip('\\n')

    lines = readlines()
    while True:
        try:
            line = lines.next()
            node = stringToListNode(line)
            prettyPrintLinkedList(node)
        except StopIteration:
            break

if __name__ == '__main__':
    main()`;

  const output = `1->2->3->4->5`;
  const [code, setCode] = useState(py_code);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.display.wrapper.style.height = "auto";
      editorRef.current.editor.refresh();
    }
  }, [code]);

  return (
    <div className="w-full max-w-xl mx-auto mt-12">
      <CodeMirror
        ref={editorRef}
        value={code}
        options={{
          mode: 'python',
          theme: 'material',
          lineNumbers: true,
          viewportMargin: Infinity, 
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <button
        className="mt-4 bg-green-800 text-white py-2 px-4 rounded font-mono hover:bg-gray-800"
        
      >
        Output
      </button>

      <div className="bg-black text-white p-4 mt-4 rounded-lg font-mono">
      {output.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>

    </div>
  );
}
