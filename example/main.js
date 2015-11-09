$(function () {
  var deepFindWhereParam = {age: 46};
  var deepFindWhereResult = _.deepFindWhere(familyTree, deepFindWhereParam);

  var deepWhereParam = {children: []};
  var deepWhereResult = _.deepWhere(familyTree, deepWhereParam);

  var deepFilterPredicate = function (obj) {
    return obj.children && obj.children.length == 1;
  };
  var deepFilterResult = _.deepFilter(familyTree, deepFilterPredicate);

  var deepFindPredicate = function (obj) {
    return _.isNumber(obj.age) && obj.age > 13 && obj.age < 30;
  };
  var deepFindResult = _.deepFind(familyTree, deepFindPredicate);

  $('#deepFindWhereParam').text(JSON.stringify(deepFindWhereParam));
  $('#deepFindWhereResult').text(JSON.stringify(deepFindWhereResult, null, 2));

  $('#deepWhereParam').text(JSON.stringify(deepWhereParam));
  $('#deepWhereResult').text(JSON.stringify(deepWhereResult, null, 2));
  $('#deepWhereLength').text(deepWhereResult ? deepWhereResult.length : 0);

  $('#deepFilterParam').text(deepFilterPredicate.toString());
  $('#deepFilterResult').text(JSON.stringify(deepFilterResult, null, 2));
  $('#deepFilterLength').text(deepFilterResult ? deepFilterResult.length : 0);

  $('#deepFindParam').text(deepFindPredicate.toString());
  $('#deepFindResult').text(JSON.stringify(deepFindResult, null, 2));

  SyntaxHighlighter.all()
});