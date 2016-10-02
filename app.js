"use strict";

(function(){
  angular
  .module("app", [])
  .controller("protocolController", protocolController);

  function protocolController(){
    var vm = this;

    vm.protocols = ["Antagonist", "Lupron Trigger"]

    vm.enter = function (protocol){
      console.log("protocol = " + protocol)
      var protocol = protocol
      vm.datesEntered = true
      var numberOfBCDays = vm.birthControl;
      var firstDayOfBCDate = vm.firstDayOfBC;
      var firstDayofBCMonth = firstDayOfBCDate.getMonth();
      var firstDayofBCYear = firstDayOfBCDate.getFullYear();
      var bcDay = firstDayOfBCDate.getDate();

      vm.dayAfterBC = bcDay + numberOfBCDays;
      vm.dateAfterBC = new Date(firstDayofBCYear,firstDayofBCMonth, vm.dayAfterBC);

      vm.stimDays = []
      for(var i = 3; i < 15; i++){
          vm.stimDays.push(new Date(firstDayofBCYear, firstDayofBCMonth, vm.dayAfterBC + i))
      };
      vm.triggerDay = vm.stimDays[11];
      var triggerDate = vm.triggerDay.getDate();
      var triggerMonth = vm.triggerDay.getMonth();
      var triggerYear = vm.triggerDay.getFullYear();

      if(protocol === "Lupron Trigger"){
        vm.lupronTrigger = new Date(triggerYear, triggerMonth, triggerDate+1);
      }

      vm.eggRetrieval = new Date(triggerYear, triggerMonth, triggerDate+2);
      vm.embryoTransfer = new Date(triggerYear, triggerMonth, triggerDate+7);
      vm.pregnancyTest = new Date(triggerYear, triggerMonth, triggerDate+20);
    }
  };
})();
