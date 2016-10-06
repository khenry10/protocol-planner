"use strict";

(function(){
  angular
  .module("app", [])
  .controller("protocolController", protocolController);

  function protocolController(){
    var vm = this;
    vm.protocolNames = ["Antagonist", "Lupron Trigger", "Clomid", "Microdose Flare (No OCP)", "Vivelle Patch"]
    vm.protocols = {antagonist:{}, lupron: {}, clomid:{}, flare:{}, vivelle:{}};
    vm.protocolStub = [vm.protocols.antagonist, vm.protocols.lupron, vm.protocols.clomid, vm.protocols.flare,
      vm.protocols.vivelle];

    vm.newDate = function(dates, year, month, date){
      console.log("dates =  "+ JSON.stringify(dates))
      dates.treatmentDate.push(new Date(year, month, date))
    };

    vm.mapIt = function(dates){
      dates.treatment =
        dates.treatmentStep.map(function(value, index){
          return {
            data: value,
            value: dates.treatmentDate[index],
            protocolDay: dates.protocolDay[index]
          }
        });
    }

    var antagonist = function(protocol, dates, firstDayofBCYear, firstDayofBCMonth, bcDay, numberOfBCDays){
      console.log("protocol = " + protocol)
      console.log("dates = " + JSON.stringify(dates));
      console.log("menseYear = " + firstDayofBCYear)
      console.log("menseMonth = " + firstDayofBCMonth)
      console.log("menseDay = " + bcDay)
      dates.protocolDay = [];

      vm.newDate(dates, firstDayofBCYear, firstDayofBCMonth, bcDay)
      dates.treatmentStep.push("Start your birth control pills and take 1 tablet")

      vm.dayAfterBC = bcDay + numberOfBCDays;

      vm.newDate(dates, firstDayofBCYear,firstDayofBCMonth, vm.dayAfterBC)
      dates.treatmentStep.push("Come into the office for a check-up");

      // stim initital dose loop
      for(var i = 3; i <= 5; i++){
          vm.newDate(dates, firstDayofBCYear, firstDayofBCMonth, vm.dayAfterBC + i);
          dates.treatmentStep.push("Patient takes stim at initital dose.");
      };

      vm.triggerDay = dates.treatmentDate[4];
      var triggerDate = vm.triggerDay.getDate();
      var triggerMonth = vm.triggerDay.getMonth();
      var triggerYear = vm.triggerDay.getFullYear();

      vm.newDate(dates, triggerYear, triggerMonth, triggerDate+1);
      dates.treatmentStep.push("Patient returns to the office on 4th day of stim.");
      vm.newDate(dates, triggerYear, triggerMonth, triggerDate+4);
      dates.treatmentStep.push("Day 7 of stim.  Patient should plan on frequent monitoring visits until Day 12.");
      vm.newDate(dates, triggerYear, triggerMonth, triggerDate+9);
      dates.treatmentStep.push("Approximate date of trigger (day 12 of stim).");

      if(protocol === "Lupron Trigger"){
        vm.newDate(dates, triggerYear, triggerMonth, triggerDate+10);
        dates.treatmentStep.push("Patient visits the office");
      };

      vm.newDate(dates, triggerYear, triggerMonth, triggerDate+11);
      dates.treatmentStep.push("Egg retrieval.");
      vm.newDate(dates, triggerYear, triggerMonth, triggerDate+16);
      dates.treatmentStep.push("Embryo Transfer.");
      vm.newDate(dates, triggerYear, triggerMonth, triggerDate+18);
      dates.treatmentStep.push("Pregnancy Test #1");

      vm.mapIt(dates)
    }

    var clomid = function(dates, menseYear, menseMonth, menseDay){
      vm.newDate(dates, menseYear, menseMonth, menseDay);
      dates.treatmentStep.push("Call your Primary Nurse with the first day of full flow.  ***Make an appointment for day 3 of menses");
      dates.protocolDay.push(1);

      vm.newDate(dates, menseYear, menseMonth, menseDay+2);
      dates.treatmentStep.push("Office visit, ultrasound and/or blood work");
      dates.protocolDay.push(3);

      vm.newDate(dates, menseYear, menseMonth, menseDay+2);
      dates.treatmentStep.push("Start taking Clomid as directed, each evening until " + new Date(menseYear, menseMonth, menseDay+6).toDateString());
      dates.protocolDay.push("3 - 7");

      vm.newDate(dates, menseYear, menseMonth, menseDay+10);
      dates.treatmentStep.push("Office visit on cycle day 11 for ultrasound and bloodwork.  Potential trigger day.");
      dates.protocolDay.push(11);

      vm.newDate(dates, menseYear, menseMonth, menseDay+11);
      dates.treatmentStep.push("Free day.  No intercourse today.");
      dates.protocolDay.push(12);

      vm.newDate(dates, menseYear, menseMonth, menseDay+12);
      dates.treatmentStep.push("Approximate IUI date.");
      dates.protocolDay.push(13);

      vm.newDate(dates, menseYear, menseMonth, menseDay+13);
      dates.treatmentStep.push("Start prometrium.");
      dates.protocolDay.push(14);

      vm.newDate(dates, menseYear, menseMonth, menseDay+27);
      dates.treatmentStep.push("Pregnancy Test.");
      dates.protocolDay.push(28);

      vm.mapIt(dates);
    };

    var flare = function(dates, menseYear, menseMonth, menseDay){
      vm.newDate(dates, menseYear, menseMonth, menseDay);
      dates.treatmentStep.push("Call your Primary Nurse with the first day of full flow.  Please schedule an appointment for day 2 of menses");
      dates.protocolDay.push("Menses Day 1");

      vm.newDate(dates, menseYear, menseMonth, menseDay+1);
      dates.treatmentStep.push("Office visit for ultrasound and bloodwork");
      dates.protocolDay.push(2);

      vm.newDate(dates, menseYear, menseMonth, menseDay+1);
      dates.treatmentStep.push("Begin 20 unites of Microdose Lupron SQ");
      dates.protocolDay.push(2);

      vm.newDate(dates, menseYear, menseMonth, menseDay+2);
      dates.treatmentStep.push("Continue 20 units Microdose Lupron SQ, every 12 hours");
      dates.protocolDay.push(" ");

      vm.newDate(dates, menseYear, menseMonth, menseDay+3);
      dates.treatmentStep.push("Continue 20 units Microdose Lupron SQ, every 12 hours, begin Gonadotropin injections");
      dates.protocolDay.push("Stimulation day 1");

      vm.newDate(dates, menseYear, menseMonth, menseDay+4);
      dates.treatmentStep.push("Continue 20 units Microdose Lupron SQ, every 12 hours, continue Gonadotropin injections for 2 days");
      dates.protocolDay.push("Stimulation day 2, 3");

      vm.newDate(dates, menseYear, menseMonth, menseDay+6);
      dates.treatmentStep.push("Take AM dose of Microdose and Gonadotropin.  Return to office for bloodwork and Ultrasounds");
      dates.protocolDay.push("Stimulation day 4");

      vm.newDate(dates, menseYear, menseMonth, menseDay+7);
      dates.treatmentStep.push("Approximate frequent monitoring appts until " + new Date(menseYear, menseMonth, menseDay+14).toDateString());
      dates.protocolDay.push("Stimulation day 5-12");

      vm.newDate(dates, menseYear, menseMonth, menseDay+14);
      dates.treatmentStep.push("Approximate trigger");
      dates.protocolDay.push(" ");

      vm.newDate(dates, menseYear, menseMonth, menseDay+16);
      dates.treatmentStep.push("Egg retrieval (Approximate date)");
      dates.protocolDay.push(" ");

      vm.newDate(dates, menseYear, menseMonth, menseDay+21);
      dates.treatmentStep.push("Embryo transfer");
      dates.protocolDay.push(" ");

      vm.mapIt(dates);
    }

    var vivelle = function(dates, menseYear, menseMonth, menseDay){
      vm.newDate(dates, menseYear, menseMonth, menseDay);
      dates.treatmentStep.push("Call your Primary Nurse with the first day of full flow.");
      dates.protocolDay.push("Menses Day 1");

      vm.newDate(dates, menseYear, menseMonth, menseDay+10);
      dates.treatmentStep.push("Start LH predictor on day 10 and continue until "
        + new Date(menseYear, menseMonth, menseDay+15).toDateString());
      dates.protocolDay.push("10 to 15");

      vm.newDate(dates, menseYear, menseMonth, menseDay+14);
      dates.treatmentStep.push("Estimated surge date");
      dates.protocolDay.push("Menses Day 14");

      vm.newDate(dates, menseYear, menseMonth, menseDay+24);
      dates.treatmentStep.push("Begin using the Vivelle patch 10 days after LH surge.");
      dates.protocolDay.push(" ");

      vm.newDate(dates, menseYear, menseMonth, menseDay+25);
      dates.treatmentStep.push("Start Gantrelix or Cetrotide injection on Day 2 of patch and continue until " +
        new Date(menseYear, menseMonth, menseDay+27).toDateString());
      dates.protocolDay.push(" ");

      vm.newDate(dates, menseYear, menseMonth, menseDay+26);
      dates.treatmentStep.push("Call your primary Nurse with day 1 of menses (full flow)");
      dates.protocolDay.push("Approx Menses Day 1");

      vm.newDate(dates, menseYear, menseMonth, menseDay+27);
      dates.treatmentStep.push("Office visit");
      dates.protocolDay.push("2");

      vm.newDate(dates, menseYear, menseMonth, menseDay+27);
      dates.treatmentStep.push("Start Gonadotropin and continue until " +
        new Date(menseYear, menseMonth, menseDay+29).toDateString());
      dates.protocolDay.push("Stim day 1 - 3");

      vm.newDate(dates, menseYear, menseMonth, menseDay+30);
      dates.treatmentStep.push("Monitoring");
      dates.protocolDay.push("Stim day 4");

      vm.newDate(dates, menseYear, menseMonth, menseDay+31);
      dates.treatmentStep.push("frequent monitoring visits until " +
        new Date(menseYear, menseMonth, menseDay+39).toDateString());
      dates.protocolDay.push("Stim day 12");

      vm.newDate(dates, menseYear, menseMonth, menseDay+39);
      dates.treatmentStep.push("Approx trigger date ")
      dates.protocolDay.push("Stim day 12");

      vm.newDate(dates, menseYear, menseMonth, menseDay+41);
      dates.treatmentStep.push("Egg retrieval")
      dates.protocolDay.push(" ");

      vm.newDate(dates, menseYear, menseMonth, menseDay+46);
      dates.treatmentStep.push("Embryo transfer")
      dates.protocolDay.push(" ");

      vm.mapIt(dates);
    }

    vm.enter = function (protocol){
      console.log("protocol = " + protocol)
      //  protocol = "Antagonist - Vivelle"

      var protoIndex = vm.protocolNames.indexOf(protocol);
      var dates = vm.protocolStub[protoIndex];
      vm.datesEntered = true;
      dates.treatmentDate = [];
      dates.treatmentStep = [];
      dates.protocolDay = [];

      var numberOfBCDays = vm.birthControl;
      var firstDayOfBCDate = vm.firstDayOfBC;
      // firstDayOfBCDate = new Date(2016, 9, 1)
      console.log("firstDayOfBCDate  = " + firstDayOfBCDate)
      var firstDayofBCMonth = firstDayOfBCDate.getMonth();
      var firstDayofBCYear = firstDayOfBCDate.getFullYear();
      var bcDay = firstDayOfBCDate.getDate();

      if(protocol === 'Antagonist' || protocol === 'Lupron Trigger'){
        antagonist(protocol, dates, firstDayofBCYear, firstDayofBCMonth, bcDay, vm.birthControl);
      }
      if(protocol === 'Clomid'){
        clomid(dates, firstDayofBCYear, firstDayofBCMonth, bcDay);
      }
      if(protocol === 'Microdose Flare (No OCP)'){
        flare(dates, firstDayofBCYear, firstDayofBCMonth, bcDay);
      }
      if(protocol === 'Vivelle Patch'){
        vivelle(dates, firstDayofBCYear, firstDayofBCMonth, bcDay);
      }
    }
  };
})();
