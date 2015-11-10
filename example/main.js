$(function () {

  // deepFindWhere
  var deepFindWhereParam = {age: 46};
  var deepFindWhereResult = _.deepFindWhere(familyTree, deepFindWhereParam);
  $('#deepFindWhereParam').text(JSON.stringify(deepFindWhereParam));
  $('#deepFindWhereResult').text(JSON.stringify(deepFindWhereResult, null, 2));

  // deepWhere
  var deepWhereParam = {children: []};
  var deepWhereResult = _.deepWhere(familyTree, deepWhereParam);
  $('#deepWhereParam').text(JSON.stringify(deepWhereParam));
  $('#deepWhereResult').text(JSON.stringify(deepWhereResult, null, 2));
  $('#deepWhereLength').text(deepWhereResult ? deepWhereResult.length : 0);

  // deepFilter
  var deepFilterPredicate = function (obj) {
    return obj.children && obj.children.length == 1;
  };
  var deepFilterResult = _.deepFilter(familyTree, deepFilterPredicate);
  $('#deepFilterParam').text(deepFilterPredicate.toString());
  $('#deepFilterResult').text(JSON.stringify(deepFilterResult, null, 2));
  $('#deepFilterLength').text(deepFilterResult ? deepFilterResult.length : 0);

  // deepFind
  var deepFindPredicate = function (obj) {
    return _.isNumber(obj.age) && obj.age > 13 && obj.age < 30;
  };
  var deepFindResult = _.deepFind(familyTree, deepFindPredicate);

  $('#deepFindParam').text(deepFindPredicate.toString());
  $('#deepFindResult').text(JSON.stringify(deepFindResult, null, 2));

  // deepSearch
  var deepSearchParam = [13];
  var deepSearchResult = _.deepSearch(familyTree, deepSearchParam);
  $('#deepSearchParam').text(JSON.stringify(deepSearchParam));
  $('#deepSearchResult').text(JSON.stringify(deepSearchResult, null, 2));
  $('#deepSearchLength').text(deepSearchResult ? deepSearchResult.length : 0);

  SyntaxHighlighter.all()
});