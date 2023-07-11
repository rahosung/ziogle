function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('지오유')
      .addItem('본 문서를 전자결재로 상신', 'menuItem1')
      .addSeparator()
      .addSubMenu(ui.createMenu('바로가기')
          .addItem('그룹웨어로 이동', 'menuItem2'))
      .addToUi();
}

function menuItem1() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('You clicked the first menu item!');
}

function menuItem2() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('You clicked the second menu item!');
  myFunction();
}
