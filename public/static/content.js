chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  const dateInput = document.querySelector('.input-group.date.ProcedureDate input[type="text"]');
  if (dateInput) {
      dateInput.value = request.date;
  }
 document.getElementById("PatientTypes").value = [
    "30",
    "31",
    "32",
    "33",
    "34",
  ][request.ageCategory];

  if (request.type == "anesthesia") {

    var asa1 = document.getElementById("156628");
    var asa2 = document.getElementById("156632");
    var asa3 = document.getElementById("156634");
    var asa4 = document.getElementById("156636");
    var asa5 = document.getElementById("156630");
    var asa6 = document.getElementById("156631");
    var asa1e = document.getElementById("156629");
    var asa2e = document.getElementById("156633");
    var asa3e = document.getElementById("156635");
    var asa4e = document.getElementById("156637");
    var asa5e = document.getElementById("156626");
  
    asa1.checked = false;
    asa2.checked = false;
    asa3.checked = false;
    asa4.checked = false;
    asa5.checked = false;
    asa6.checked = false;
    asa1e.checked = false;
    asa2e.checked = false;
    asa3e.checked = false;
    asa4e.checked = false;
    asa5e.checked = false;
  
    if (request.asaClass == "1") {
      asa1e.checked = request.isEmergency != "No";
      asa1.checked = !asa1e.checked;
    } else if (request.asaClass == "2") {
      asa2e.checked = request.isEmergency != "No";
      asa2.checked = !asa2e.checked;
    } else if (request.asaClass == "3") {
      asa3e.checked = request.isEmergency != "No";
      asa3.checked = !asa3e.checked;
    } else if (request.asaClass == "4") {
      asa4e.checked = request.isEmergency != "No";
      asa4.checked = !asa4e.checked;
    } else if (request.asaClass == "5") {
      asa5e.checked = request.isEmergency != "No";
      asa5.checked = !asa5e.checked;
    } else if (request.asaClass == "6") {
      asa6.checked = true;
    }
  
    document.getElementById("CaseTypes_46").checked =
      request.isEmergency == "Non-Trauma";
  
    document.getElementById("CaseTypes_134").checked = request.isEmergency == "Trauma"
  
    document.getElementById("CaseTypes_148").checked = request.isDifficultAirway == "Anticipated" 
    document.getElementById("CaseTypes_149").checked = request.isDifficultAirway == "Unanticipated" 
  
    var cse = document.getElementById("156646");
    var epi = document.getElementById("1256332");
    var ga = document.getElementById("1256330");
    var mac = document.getElementById("156641");
    var spinal = document.getElementById("1256331");
  
    cse.checked = false;
    epi.checked = false;
    ga.checked = false;
    mac.checked = false;
    spinal.checked = false;
  
    if (request.anesType == "GA") {
      ga.checked = true;
    } else if (request.anesType == "MAC") {
      mac.checked = true;
    } else if (request.anesType == "Spinal") {
      spinal.checked = true;
    } else if (request.anesType == "Epidural") {
      epi.checked = true;
    } else if (request.anesType == "CSE") {
      cse.checked = true;
    } else if (request.anesType == "GA + Epidural") {
      ga.checked = true;
      epi.checked = true;
    }
  
    var lma = document.getElementById("1256333");
    var direct = document.getElementById("1256334");
    var indirect = document.getElementById("1256335");
    var oral = document.getElementById("156654");
    var nasal = document.getElementById("156655");
    var mask = document.getElementById("156650");
    var bronch = document.getElementById("2298046");

    var bronchialBlocker = document.getElementById("156674");
    var dlt = document.getElementById("1256336");
    var jet = document.getElementById("156666");
    var awake = document.getElementById("2298047");

    lma.checked = false;
    direct.checked = false;
    indirect.checked = false;
    oral.checked = false;
    nasal.checked = false;
    mask.checked = false;
    bronch.checked = false;
    bronchialBlocker.checked = false;
    dlt.checked = false;
    jet.checked = false;
    awake.checked = false;
    
  
    if (request.airwayDevice == "Oral ETT") {
      oral.checked = true;
    } else if (request.airwayDevice == "Nasal ETT") {
      nasal.checked = true;
    } else if (request.airwayDevice == "LMA") {
      lma.checked = true;

    } else if (request.airwayDevice == "Mask Only")  {
      mask.checked = true;
    }

    if (request.directLaryngoscopy) {
      direct.checked = true;
    }

    if (request.indirectLaryngoscopy) {
      indirect.checked = true;
    }

    if (request.flexibleBronchoscopy) {
      bronch.checked = true;
    }

    if (request.dlt) { dlt.checked = true; }
    if (request.bronchialBlocker) { bronchialBlocker.checked = true; }
    if (request.jetVentilation) { jet.checked = true; }
    if (request.awakeIntubation) { awake.checked = true; }

  
    var cardiacnocpb = document.getElementById("156682");
    var cardiaccpb = document.getElementById("156681");
    var vascendo = document.getElementById("156685");
    var vascopen = document.getElementById("156684");
    var brainendo = document.getElementById("156688");
    var brainnonvasc = document.getElementById("156689");
    var brainvascopen = document.getElementById("156687");
    var cs = document.getElementById("156692");
    var cshr = document.getElementById("156686");
    var vagdel = document.getElementById("156690");
    var vagdelhr = document.getElementById("156691");
    var intrathoracic = document.getElementById("156683");
  
    cardiacnocpb.checked = false;
    cardiaccpb.checked = false;
    vascendo.checked = false;
    vascopen.checked = false;
    brainendo.checked = false;
    brainnonvasc.checked = false;
    brainvascopen.checked = false;
    cs.checked = false;
    cshr.checked = false;
    vagdel.checked = false;
    vagdelhr.checked = false;
    intrathoracic.checked = false;
  
    if (request.category == "Cardiac") {
      if (request.subcategory == "Without CPB") {
        cardiacnocpb.checked = true;
      } else if (request.subcategory == "With CPB") {
        cardiaccpb.checked = true;
      }
    } else if (request.category == "Intrathoracic") {
      intrathoracic.checked = true;
    } else if (request.category == "Major Vascular") {
      if (request.subcategory == "Endovascular") {
        vascendo.checked = true;
      } else if (request.subcategory == "Open Vascular") {
        vascopen.checked = true;
      }
    } else if (request.category == "Intracerebral") {
      if (request.subcategory == "Endovascular") {
        brainendo.checked = true;
      } else if (request.subcategory == "Open Vascular") {
        brainvascopen.checked = true;
      } else if (request.subcategory == "Open Nonvascular") {
        brainnonvasc.checked = true;
      }
    } else if (request.category == "Delivery") {
      if (request.subcategory == "C-Section") {
        cs.checked = true;
      } else if (request.subcategory == "High-Risk C-Section") {
        cshr.checked = true;
      } else if (request.subcategory == "Vaginal Delivery") {
        vagdel.checked = true;
      } else if (request.subcategory == "High-Risk Vaginal Delivery") {
        vagdelhr.checked = true;
      }
    }
  
    var us = document.getElementById("156693");
    var aline = document.getElementById("1256338");
    var cline = document.getElementById("1256339");
    var pacath = document.getElementById("156700");
    var csf = document.getElementById("1256341");
    var epm = document.getElementById("156708");
    var tee = document.getElementById("156707");
  
    us.checked = request.ultrasound;
    aline.checked = request.aline;
    cline.checked = request.cline;
    pacath.checked = request.pacath;
    csf.checked = request.csf;
    epm.checked = request.epm;
    tee.checked = request.tee;
  
  } else if (request.type == "block") {
    var continuous = document.getElementById("156647");
    var single = document.getElementById("156648")
    var adductorCanal = document.getElementById("1911477");
    var ankle = document.getElementById("156730");
    var axillary = document.getElementById("156734");
    var erectorSpinaePlane = document.getElementById("1911478");
    var femoral = document.getElementById("156735");
    var infraclavicular = document.getElementById("156732");
    var interscalene = document.getElementById("156731");
    var lumbarPlexus = document.getElementById("156737");
    var paravertebral = document.getElementById("156739");
    var popliteal = document.getElementById("156729");
    var quadratusLumborum = document.getElementById("1911476");
    var retrobulbar = document.getElementById("156738");
    var saphenous = document.getElementById("156740");
    var sciatic = document.getElementById("156736");
    var supraclavicular = document.getElementById("156733");
    var transverseAbdominalPlane = document.getElementById("1911475");
    var otherPeripheralNerveBlockSite = document.getElementById("1256340");
    
    continuous.checked = request.continuous;
    single.checked = request.single;
    adductorCanal.checked = request.adductorCanal;
    ankle.checked = request.ankle;
    axillary.checked = request.axillary;
    erectorSpinaePlane.checked = request.erectorSpinaePlane;
    femoral.checked = request.femoral;
    infraclavicular.checked = request.infraclavicular;
    interscalene.checked = request.interscalene;
    lumbarPlexus.checked = request.lumbarPlexus;
    paravertebral.checked = request.paravertebral;
    popliteal.checked = request.popliteal;
    quadratusLumborum.checked = request.quadratusLumborum;
    retrobulbar.checked = request.retrobulbar;
    saphenous.checked = request.saphenous;
    sciatic.checked = request.sciatic;
    supraclavicular.checked = request.supraclavicular;
    transverseAbdominalPlane.checked = request.transversusAbdominalPlane;
    otherPeripheralNerveBlockSite.checked = request.other;

  }

  if (request.submit == true) {
    document.getElementById("submitButton").click();
  }
});
