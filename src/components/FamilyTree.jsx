import React from "react";
import Tree from "react-d3-tree";

const FamilyTree = ({ familyTreeData }) => {
  const renderTree = (node) => {
    return {
      ...node,
      children: node.referees.map(renderTree),
    };
  };

  const formattedTreeData = renderTree(familyTreeData);

  return (
    <div className="vertical-tree">
      <Tree
        data={formattedTreeData}
        translate={{ x: 200, y: 50 }}
        orientation="vertical"
      />
    </div>
  );
};

export default FamilyTree;
