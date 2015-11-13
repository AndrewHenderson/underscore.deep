$(function () {

  // deepFind
  var deepFindParam = {age: 17};
  var deepFindResult = _.deepFind(familyTree, deepFindParam);
  $('#deepFindParam').text(JSON.stringify(deepFindParam));
  $('#deepFindResult').text(JSON.stringify(deepFindResult, null, 2));

  var deepFind2Predicate = function (obj) {
    return _.isNumber(obj.age) && obj.age > 13 && obj.age < 30;
  };
  var deepFind2Result = _.deepFind(familyTree, deepFind2Predicate);

  $('#deepFind2Param').text(deepFind2Predicate.toString());
  $('#deepFind2Result').text(JSON.stringify(deepFind2Result, null, 2));

  // deepFilter
  var deepFilterParam = {age: 9};
  var deepFilterResult = _.deepFilter(familyTree, deepFilterParam);
  $('#deepFilterParam').text(JSON.stringify(deepFilterParam));
  $('#deepFilterResult').text(JSON.stringify(deepFilterResult, null, 2));
  $('#deepFilterLength').text(deepFilterResult ? deepFilterResult.length : 0);

  // deepFilter2
  var deepFilter2Predicate = function (obj) {
    return obj.children && obj.children.length == 1;
  };
  var deepFilter2Result = _.deepFilter(familyTree, deepFilter2Predicate);
  $('#deepFilter2Param').text(deepFilter2Predicate.toString());
  $('#deepFilter2Result').text(JSON.stringify(deepFilter2Result, null, 2));
  $('#deepFilter2Length').text(deepFilter2Result ? deepFilter2Result.length : 0);


  // deepSearch
  var deepSearchParam = ['Nicholas', 13];
  var deepSearchResult = _.deepSearch(familyTree, deepSearchParam);
  $('#deepSearchParam').text(JSON.stringify(deepSearchParam));
  $('#deepSearchResult').text(JSON.stringify(deepSearchResult, null, 2));
  $('#deepSearchLength').text(deepSearchResult ? deepSearchResult.length : 0);

  SyntaxHighlighter.all()
});