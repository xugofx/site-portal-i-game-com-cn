// assets/content-map.js
// 站点内容分区、关键词标签与搜索过滤

const contentMap = {
  siteUrl: "https://site-portal-i-game.com.cn",
  primaryKeyword: "爱游戏",
  sections: [
    {
      id: "section-1",
      title: "热门推荐",
      tags: ["爱游戏", "热门", "推荐"],
      items: [
        { name: "梦幻西游", category: "RPG", rating: 4.8 },
        { name: "王者荣耀", category: "MOBA", rating: 4.9 },
        { name: "和平精英", category: "FPS", rating: 4.7 }
      ]
    },
    {
      id: "section-2",
      title: "新游速递",
      tags: ["爱游戏", "新游", "最新"],
      items: [
        { name: "原神", category: "RPG", rating: 4.6 },
        { name: "天涯明月刀", category: "MMO", rating: 4.5 }
      ]
    },
    {
      id: "section-3",
      title: "经典怀旧",
      tags: ["爱游戏", "经典", "怀旧"],
      items: [
        { name: "仙剑奇侠传", category: "RPG", rating: 4.9 },
        { name: "魔兽世界", category: "MMO", rating: 4.8 },
        { name: "红色警戒", category: "RTS", rating: 4.7 }
      ]
    }
  ]
};

// 根据关键词过滤内容分区
function filterSectionsByTag(sections, keyword) {
  const lowerKeyword = keyword.toLowerCase();
  return sections.filter(section =>
    section.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
}

// 根据关键词过滤分区内的项目（名称或分类匹配）
function filterItemsByKeyword(section, keyword) {
  const lowerKeyword = keyword.toLowerCase();
  const matchedItems = section.items.filter(item =>
    item.name.toLowerCase().includes(lowerKeyword) ||
    item.category.toLowerCase().includes(lowerKeyword)
  );
  return matchedItems.length > 0 ? { ...section, items: matchedItems } : null;
}

// 综合搜索：先过滤分区，再过滤项目
function searchContent(query) {
  if (!query || query.trim() === "") {
    return contentMap.sections;
  }
  const tagFiltered = filterSectionsByTag(contentMap.sections, query);
  const result = [];
  for (const section of tagFiltered) {
    const filtered = filterItemsByKeyword(section, query);
    if (filtered) {
      result.push(filtered);
    }
  }
  return result;
}

// 示例使用（仅用于演示，可移除）
console.log("站点:", contentMap.siteUrl);
console.log("核心关键词:", contentMap.primaryKeyword);
console.log("搜索 '爱游戏':", JSON.stringify(searchContent("爱游戏"), null, 2));
console.log("搜索 'RPG':", JSON.stringify(searchContent("RPG"), null, 2));
console.log("搜索 'MMO':", JSON.stringify(searchContent("MMO"), null, 2));