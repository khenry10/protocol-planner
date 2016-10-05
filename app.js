"use strict";

(function(){
  angular
  .module("app", [])
  .controller("protocolController", protocolController);

  function protocolController(){
    var vm = this;

    vm.protocolNames = ["Antagonist", "Lupron Trigger", "Clomid"]

    vm.protocols ={
      antagonist: {
        treatmentDate: [],
        treatmentStep: ["Start your birth control pills and take 1 tablet", "Come into the office for a check-up"]
      }
    };

    vm.enter = function (protocol){
      console.log("protocol = " + protocol)
      var protocol = protocol
      vm.datesEntered = true
      var numberOfBCDays = vm.birthControl;
      var firstDayOfBCDate = vm.firstDayOfBC;
      var firstDayofBCMonth = firstDayOfBCDate.getMonth();
      var firstDayofBCYear = firstDayOfBCDate.getFullYear();
      var bcDay = firstDayOfBCDate.getDate();

      vm.protocols.antagonist.treatmentDate.push(vm.firstDayOfBC)

      vm.dayAfterBC = bcDay + numberOfBCDays;
      vm.dateAfterBC = new Date(firstDayofBCYear,firstDayofBCMonth, vm.dayAfterBC);
      vm.protocols.antagonist.treatmentDate.push(vm.dateAfterBC)
      console.log(vm.protocols)

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
