const fs = require('fs');

fs.readFile('./index.html', 'utf8', (error, data) => {
  if (error) throw error;
  
  try {
    const DOMStack = getDOMStack(data);
    const DOMTree = createDOMTree(DOMStack)
    checkPaired(DOMTree);
  } catch (error) {
    console.log(error);
  }
});

const getDOMStack = (str, DOMStack = []) => {
  const result = str.trim().match(/(<([!\/]?)([\w]+)([\w\s="-:\.\/\\]*)(\/?)>)([\s\S]*)/);
  
  // trace done
  if (result === null)
    return DOMStack;
  // have String before tag
  if (result.index !== 0)
    return getDOMStack(result[6], [
      ...DOMStack,
      checkDOMObject(str.trim().substring(0, result.index)),
      checkDOMObject(result)]);
  
  return getDOMStack(result[6], [...DOMStack, checkDOMObject(result)]);
};

const checkDOMObject = (result) => {
  // result[1]: <!doctype html />
  // result[2]: !
  // result[3]: doctype
  // result[4]: html
  // result[5]: /
  // String
  if (!Array.isArray(result)) return {
    tag: result,
    type: 'String',
    paired: true
  };
  
  if (result[5] || checkAutoCloseTag(result[3].toLowerCase())) {
    // Auto close
    return {
      tag: result[1],
      tagName: result[3],
      attributes: result[4],
      children: [],
      type: 'autoClose',
      paired: true
    };
  } else {
    // Close tag
    if (result[2]) return {
      tag: result[1],
      tagName: result[3],
      attributes: result[4],
      type: 'close',
      paired: true
    };
    // Open
    return {
      tag: result[1],
      tagName: result[3],
      attributes: result[4],
      children: [],
      type: 'open',
      paired: false
    };
  }
};

const createDOMTree = (DOMStack, tree = [], tagPair) => {
  // create done
  if (DOMStack.length === 0) return tree;
  
  let [now, ...rest] = DOMStack;
  if (now.type === 'close') {
    if (tagPair && tagPair !== now.tagName) {
      throw { Error: `Tag must be paired: ${now.tag}` };
    }
    return [tree, rest];
  }
  if (now.type === 'open') {
    var [children, newRest] = createDOMTree(rest, [], now.tagName);
    now.children = children;
    now.paired = true;
    rest = newRest;
  }
  return createDOMTree(rest, [...tree, now], tagPair);
};

const checkAutoCloseTag = (tagName) => {
  return tagName === 'doctype' 
    || tagName === 'img'
    || tagName === 'meta';
};

const traceDOMTree = (fn, tree) => {
  tree.forEach((node) => {
    fn(node);
    node.children && node.children.length > 0 && traceDOMTree(fn, node.children);
  })
};

const checkPaired = traceDOMTree.bind(null, (node) => {
  if (!node.paired) {
    throw { Error: `Tag must be paired: ${node.tag}` };
  }
});
