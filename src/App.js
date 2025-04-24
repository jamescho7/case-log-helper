/*global chrome*/

import React, { useState, useEffect } from "react";
import SimpleDropdown from "./components/SimpleDropdown";
import Tab from "./components/Tab";

Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());

  return local.toJSON().slice(0, 10);
};

const checkboxlabelstyle = "pl-1 text-xs";
const checkboxstyle = "h-2.5";

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function App() {
  const [date, setDate] = useStickyState(new Date().toDateInputValue(), "date");

  const [ageCategory, setAgeCategory] = useStickyState(
    "12 to 64 years",
    "ageCategory"
  );
  const [asaClass, setAsaClass] = useStickyState("3", "asaClass");
  const [isEmergency, setIsEmergency] = useStickyState("No", "isEmergency");
  const [isDifficultAirway, setIsDifficultAirway] = useStickyState("No", "isDifficultAirway");

  const [anesType, setAnesType] = useStickyState("GA", "anesType");

  const [category, setCategory] = useStickyState("Default", "category");
  const [subcategory, setSubcategory] = useStickyState("None", "subcategory");

  const [ultrasound, setUltrasound] = useStickyState(false, "ultrasound");
  const [aline, setAline] = useStickyState(false, "aline");
  const [cline, setCline] = useStickyState(false, "cline");
  const [pacath, setPacath] = useStickyState(false, "pacath");
  const [csf, setCsf] = useStickyState(false, "csf");
  const [epm, setEpm] = useStickyState(false, "epm");
  const [tee, setTee] = useStickyState(false, "tee");

  const [currentUrl, setCurrentUrl] = useState("");

  // 2025 April Update

  const [airwayDevice, setAirwayDevice] = useStickyState("Oral ETT", "airwayDevice");
  const [directLaryngoscopy, setDirectLaryngoscopy] = useStickyState(true, "directLaryngoscopy");
  const [indirectLaryngoscopy, setIndirectLaryngoscopy] = useStickyState(false, "indirectLaryngoscopy");
  const [flexibleBronchoscopy, setFlexibleBronchoscopy] = useStickyState(false, "flexibleBronchoscopy");
  const [dlt, setDlt] = useStickyState(false, "dlt");
  const [bronchialBlocker, setBronchialBlocker] = useStickyState(false, "bronchialBlocker");
  const [jetVentilation, setJetVentilation] = useStickyState(false, "jetVentilation");
  const [awakeIntubation, setAwakeIntubation] = useStickyState(false, "awakeIntubation");



  // End April Update

  const [continuous, setContinuous] = useStickyState(false, 'continuous');
  const [single, setSingle] = useStickyState(false, 'single');

  const [adductorCanal, setAdductorCanal] = useStickyState(false, 'adductorCanal');
  const [ankle, setAnkle] = useStickyState(false, 'ankle');
  const [axillary, setAxillary] = useStickyState(false, 'axillary');
  const [erectorSpinaePlane, setErectorSpinaePlane] = useStickyState(false, 'erectorSpinaePlane');
  const [femoral, setFemoral] = useStickyState(false, 'femoral');
  const [infraclavicular, setInfraclavicular] = useStickyState(false, 'infraclavicular');
  const [interscalene, setInterscalene] = useStickyState(false, 'interscalene');
  const [lumbarPlexus, setLumbarPlexus] = useStickyState(false, 'lumbarPlexus');
  const [paravertebral, setParavertebral] = useStickyState(false, 'paravertebral');
  const [other, setOther] = useStickyState(false, "other");
  const [popliteal, setPopliteal] = useStickyState(false, 'popliteal');
  const [quadratusLumborum, setQuadratusLumborum] = useStickyState(false, 'quadratusLumborum');
  const [retrobulbar, setRetrobulbar] = useStickyState(false, 'retrobulbar');
  const [saphenous, setSaphenous] = useStickyState(false, 'saphenous');
  const [sciatic, setSciatic] = useStickyState(false, 'sciatic');
  const [supraclavicular, setSupraclavicular] = useStickyState(false, 'supraclavicular');
  const [transversusAbdominalPlane, setTransversusAbdominalPlane] = useStickyState(false, 'transversusAbdominalPlane');



  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0].url) setCurrentUrl(tabs[0].url);
    });
  
    const handler = (_, changeInfo, tab) => {
      if (tab.url) setCurrentUrl(tab.url);
    };
    chrome.tabs.onUpdated.addListener(handler);
  
    return () => chrome.tabs.onUpdated.removeListener(handler);
  }, []);

  const reset = () => {

    if (activeTab == "Anesthesia") {
      setDate(new Date().toDateInputValue());
      setAgeCategory("12 to 64 years");
      setAsaClass("3");
      setIsEmergency("No");
      setIsDifficultAirway("No")
      setAnesType("GA");
      setCategory("Default");
      setSubcategory("None");
      setUltrasound(false);
      setAline(false);
      setCline(false);
      setPacath(false);
      setCsf(false);
      setEpm(false);
      setTee(false);

      setAirwayDevice("Oral ETT");
      setDirectLaryngoscopy(true);
      setIndirectLaryngoscopy(false);
      setFlexibleBronchoscopy(false);

      setDlt(false);
      setBronchialBlocker(false);
      setJetVentilation(false);
      setAwakeIntubation(false);

    } else if (activeTab == "Nerve Blocks") {
      setContinuous(false);
      setSingle(false);
      setAdductorCanal(false);
      setAnkle(false);
      setAxillary(false);
      setErectorSpinaePlane(false);
      setFemoral(false);
      setInfraclavicular(false);
      setInterscalene(false);
      setLumbarPlexus(false);
      setParavertebral(false);
      setOther(false);
      setPopliteal(false);
      setQuadratusLumborum(false);
      setRetrobulbar(false);
      setSaphenous(false);
      setSciatic(false);
      setSupraclavicular(false);
      setTransversusAbdominalPlane(false);
    }
  };

  useEffect(() => {
    if (asaClass == "6") {
      setIsEmergency("No");
    }

  }, []);

  useEffect(() => {


    if (!["Oral ETT", "Nasal ETT"].includes(airwayDevice)) {
      setDirectLaryngoscopy(false);
      setIndirectLaryngoscopy(false);
      setFlexibleBronchoscopy(false);
      setDlt(false);
      setBronchialBlocker(false);
      setJetVentilation(false);
      setAwakeIntubation(false);
    }

  }, [airwayDevice]);

  const Subcategory = (props) => {
    switch (props.category) {
      case "Default":
        return;
      case "Cardiac":
        return (
          <SimpleDropdown
            label="Procedure Subcategory"
            options={["Without CPB", "With CPB"]}
            value={subcategory}
            setValue={setSubcategory}
          />
        );
      case "Major Vascular":
        return (
          <SimpleDropdown
            label="Procedure Subcategory"
            options={["Endovascular", "Open Vascular"]}
            value={subcategory}
            setValue={setSubcategory}
          />
        );
      case "Intrathoracic":
        return;
      case "Intracerebral":
        return (
          <SimpleDropdown
            label="Procedure Subcategory"
            options={["Endovascular", "Open Nonvascular", "Open Vascular"]}
            value={subcategory}
            setValue={setSubcategory}
          />
        );
      case "Delivery":
        return (
          <SimpleDropdown
            label="Procedure Subcategory"
            options={[
              "C-Section",
              "High-Risk C-Section",
              "Vaginal Delivery",
              "High-Risk Vaginal Delivery",
            ]}
            value={subcategory}
            setValue={setSubcategory}
          />
        );
    }
  };

  const sendMessage = (doSubmit) => {

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var currentTab = tabs[0];
      if (activeTab == "Anesthesia") {

        chrome.tabs.sendMessage(currentTab.id, {
          type: "anesthesia",
          date: date.toString("MM/dd/yyyy"),
          ageCategory: [
            "<3 mos.",
            "3 mos to 2 years",
            "3 to 11 years",
            "12 to 64 years",
            "65+",
          ].indexOf(ageCategory),
          asaClass,
          isEmergency,
          isDifficultAirway,
          anesType,
          category,
          subcategory,
          ultrasound,
          aline,
          cline,
          pacath,
          csf,
          epm,
          tee,

          airwayDevice,
          directLaryngoscopy, indirectLaryngoscopy, flexibleBronchoscopy,
          dlt,
          bronchialBlocker,
          jetVentilation,
          awakeIntubation,
      
          submit: doSubmit,
        });
      } else if (activeTab == "Nerve Blocks") {

        chrome.tabs.sendMessage(currentTab.id, {
          type: "block",
          date: date.toString("MM/dd/yyyy"),
          ageCategory: [
            "<3 mos.",
            "3 mos to 2 years",
            "3 to 11 years",
            "12 to 64 years",
            "65+",
          ].indexOf(ageCategory),
          continuous,
          single,
          adductorCanal,
          ankle,
          axillary,
          erectorSpinaePlane,
          femoral,
          infraclavicular,
          interscalene,
          lumbarPlexus,
          paravertebral,
          other,
          popliteal,
          quadratusLumborum,
          retrobulbar,
          saphenous,
          sciatic,
          supraclavicular,
          transversusAbdominalPlane,
          submit: doSubmit,
        });
      }

    });
  };

  const active = currentUrl.includes("apps.acgme.org/") || currentUrl.includes("https://tourmaline-bonbon-1ece8a.netlify.app/");

  
  const anesTab = (
    <>
      <div className="flex">
        <div className="flex flex-col pr-2">
          <SimpleDropdown
            label="ASA Class"
            options={
              isEmergency === "No"
                ? ["1", "2", "3", "4", "5", "6"]
                : ["1", "2", "3", "4", "5"]
            }
            suffix={isEmergency !== "No" ? "E" : ""}
            value={asaClass}
            setValue={setAsaClass}
          />
        </div>
        <div className="flex flex-col pr-2">
          {asaClass !== "6" && (
            <SimpleDropdown
              label="Emergency?"
              options={["No", "Trauma", "Non-Trauma"]}
              value={isEmergency}
              setValue={setIsEmergency}
            />
          )}
        </div>
        <div className="flex flex-col pr-2">
            <SimpleDropdown
              label="Difficult Airway?"
              options={["No", "Anticipated", "Unanticipated"]}
              value={isDifficultAirway}
              setValue={setIsDifficultAirway}
            />
        </div>
      </div>
  
      <div className="flex">
        <div className="flex flex-col">
          <SimpleDropdown
            label="Primary Anesthesia"
            options={["GA", "MAC", "Spinal", "Epidural", "CSE", "GA + Epidural"]}
            value={anesType}
            setValue={setAnesType}
          />
        </div>
      </div>
  
      <div className="flex">


        <div className="flex flex-col">
            <SimpleDropdown
              label="Airway Device"
              options={["Oral ETT", "Nasal ETT", "LMA", "Mask Only", "Natural"]}
              value={airwayDevice}
              setValue={setAirwayDevice}
            />

{(["Oral ETT", "Nasal ETT"].includes(airwayDevice)) && (
    <>
      <div className="mt-2 text-xs text-blue-500">Airway Technique</div>
      <div className="mt-0.5 flex flex-wrap space-x-4">
        <label className="flex items-center text-xs">
          <input
            type="checkbox"
            className={checkboxstyle}
            checked={directLaryngoscopy}
            onChange={() => setDirectLaryngoscopy(v => !v)}
          />
          <span className={checkboxlabelstyle}>Direct Laryngoscopy</span>
        </label>
        <label className="flex items-center text-xs">
          <input
            type="checkbox"
            className={checkboxstyle}
            checked={indirectLaryngoscopy}
            onChange={() => setIndirectLaryngoscopy(v => !v)}
          />
          <span className={checkboxlabelstyle}>Indirect Laryngoscopy</span>
        </label>
        <label className="flex items-center text-xs">
          <input
            type="checkbox"
            className={checkboxstyle}
            checked={flexibleBronchoscopy}
            onChange={() => setFlexibleBronchoscopy(v => !v)}
          />
          <span className={checkboxlabelstyle}>Flexible Bronchoscopy</span>
        </label>
      </div>

            <div className="mt-1 text-xs text-blue-500">Airway Modifiers</div>
            <div className="mt-0.5 flex flex-wrap space-x-4">
              <label className="flex items-center text-xs">
                <input type="checkbox" className={checkboxstyle} checked={dlt} onChange={() => setDlt(v => !v)} />
                <span className={checkboxlabelstyle}>DLT</span>
              </label>
              <label className="flex items-center text-xs">
                <input type="checkbox" className={checkboxstyle} checked={bronchialBlocker} onChange={() => setBronchialBlocker(v => !v)} />
                <span className={checkboxlabelstyle}>Bronchial blocker</span>
              </label>
              <label className="flex items-center text-xs">
                <input type="checkbox" className={checkboxstyle} checked={jetVentilation} onChange={() => setJetVentilation(v => !v)} />
                <span className={checkboxlabelstyle}>Jet ventilation</span>
              </label>
              <label className="flex items-center text-xs">
                <input type="checkbox" className={checkboxstyle} checked={awakeIntubation} onChange={() => setAwakeIntubation(v => !v)} />
                <span className={checkboxlabelstyle}>Awake intubation</span>
              </label>
            </div>
          </>)}
          </div>
      </div>
  
      <div className = "mt-2"
      ></div>
      <SimpleDropdown
        label="Procedure Category"
        options={[
          "Default",
          "Cardiac",
          "Intrathoracic",
          "Major Vascular",
          "Intracerebral",
          "Delivery",
        ]}
        value={category}
        setValue={setCategory}
      />
  
      <Subcategory category={category} />
  
      <div className="flex mt-1.5">
        <div>
          <label className="text-xs text-blue-500" htmlFor="access">
            Access
          </label>
          <div id="access">
            <input
              type="checkbox"
              id="ultrasound"
              className={checkboxstyle}
              checked={ultrasound}
              onChange={() => {
                setUltrasound((ultrasound) => !ultrasound);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="ultrasound">
              Ultrasound-guided access
            </label>
            <br />
  
            <input
              type="checkbox"
              id="aline"
              className={checkboxstyle}
              checked={aline}
              onChange={() => {
                setAline((aline) => !aline);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="aline">
              Arterial line
            </label>
            <br />
  
            <input
              type="checkbox"
              id="cline"
              className={checkboxstyle}
              checked={cline}
              onChange={() => {
                setCline((cline) => !cline);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="cline">
              Central line
            </label>
            <br />
  
            <input
              type="checkbox"
              id="pacath"
              className={checkboxstyle}
              checked={pacath}
              onChange={() => {
                setPacath((pacath) => !pacath);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="pacath">
              Pulmonary artery catheter
            </label>
            <br />
          </div>
        </div>
  
        <div className="pl-5">
          <label className="text-xs text-blue-500" htmlFor="specialmonitors">
            Special Monitors
          </label>
          <div id="specialmonitors">
            <input
              type="checkbox"
              id="csf"
              className={checkboxstyle}
              checked={csf}
              onChange={() => {
                setCsf((csf) => !csf);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="csf">
              CSF Drain
            </label>
            <br />
  
            <input
              type="checkbox"
              id="epmonitor"
              className={checkboxstyle}
              checked={epm}
              onChange={() => {
                setEpm((epm) => !epm);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="epmonitor">
              Electrophysiologic monitor
            </label>
            <br />
  
            <input
              type="checkbox"
              id="tee"
              className={checkboxstyle}
              checked={tee}
              onChange={() => {
                setTee((tee) => !tee);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="tee">
              TEE
            </label>
            <br />
          </div>
        </div>
      </div>
    </>
  );

  const blockTab = (
    <>
      <div className="flex mt-1.5">
        <div>
          <label className="text-xs text-blue-500" htmlFor="blockType">
            Block Type
          </label>
          <div id="blockType">
            <input
              type="checkbox"
              id="Continuous"
              className={checkboxstyle}
              checked={continuous}
              onChange={() => {
                setContinuous((continuous) => !continuous);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="Continuous">
              Continuous
            </label>
            <br />
  
            <input
              type="checkbox"
              id="single"
              className={checkboxstyle}
              checked={single}
              onChange={() => {
                setSingle((single) => !single);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="single">
              Single shot
            </label>
            <br />
          </div>
        </div>
  
        <div className="pl-4">
          <label className="text-xs text-blue-500" htmlFor="upperextremityblocks">
            Upper Extremity Blocks
          </label>
          <div id="upperextremityblocks">
            <input
              type="checkbox"
              id="axillary"
              className={checkboxstyle}
              checked={axillary}
              onChange={() => {
                setAxillary((axillary) => !axillary);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="axillary">
              Axillary
            </label>
            <br />
  
            <input
              type="checkbox"
              id="infraclavicular"
              className={checkboxstyle}
              checked={infraclavicular}
              onChange={() => {
                setInfraclavicular((infraclavicular) => !infraclavicular);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="infraclavicular">
              Infraclavicular
            </label>
            <br />
  
            <input
              type="checkbox"
              id="interscalene"
              className={checkboxstyle}
              checked={interscalene}
              onChange={() => {
                setInterscalene((interscalene) => !interscalene);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="interscalene">
              Interscalene
            </label>
            <br />
  
            <input
              type="checkbox"
              id="supraclavicular"
              className={checkboxstyle}
              checked={supraclavicular}
              onChange={() => {
                setSupraclavicular((supraclavicular) => !supraclavicular);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="supraclavicular">
              Supraclavicular
            </label>
            <br />
          </div>
        </div>
  
        <div className="pl-4">
          <label className="text-xs text-blue-500" htmlFor="lowerextremityblocks">
            Lower Extremity Blocks
          </label>
          <div id="lowerextremityblocks">
            <input
              type="checkbox"
              id="adductorcanal"
              className={checkboxstyle}
              checked={adductorCanal}
              onChange={() => {
                setAdductorCanal((adductorCanal) => !adductorCanal);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="adductorcanal">
              Adductor Canal
            </label>
            <br />

            <input
              type="checkbox"
              id="ankle"
              className={checkboxstyle}
              checked={ankle}
              onChange={() => {
                setAnkle((ankle) => !ankle);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="ankle">
              Ankle
            </label>
            <br />
  
            <input
              type="checkbox"
              id="femoral"
              className={checkboxstyle}
              checked={femoral}
              onChange={() => {
                setFemoral((femoral) => !femoral);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="femoral">
              Femoral
            </label>
            <br />
  
            <input
              type="checkbox"
              id="popliteal"
              className={checkboxstyle}
              checked={popliteal}
              onChange={() => {
                setPopliteal((popliteal) => !popliteal);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="popliteal">
              Popliteal
            </label>
            <br />
  
            <input
              type="checkbox"
              id="saphenous"
              className={checkboxstyle}
              checked={saphenous}
              onChange={() => {
                setSaphenous((saphenous) => !saphenous);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="saphenous">
              Saphenous
            </label>
            <br />
  
            <input
              type="checkbox"
              id="sciatic"
              className={checkboxstyle}
              checked={sciatic}
              onChange={() => {
                setSciatic((sciatic) => !sciatic);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="sciatic">
              Sciatic
            </label>
            <br />
          </div>
        </div>
      </div>
  
      <div className="flex mt-1.5">
        <div>
          <label className="text-xs text-blue-500" htmlFor="trunkabdominalblocks">
            Trunkal Blocks
          </label>
          <div id="trunkabdominalblocks">
            <input
              type="checkbox"
              id="erectorSpinaePlane"
              className={checkboxstyle}
              checked={erectorSpinaePlane}
              onChange={() => {
                setErectorSpinaePlane((erectorSpinaePlane) => !erectorSpinaePlane);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="erectorSpinaePlane">
              ESP
            </label>
            <br />
  
            <input
              type="checkbox"
              id="lumbarPlexus"
              className={checkboxstyle}
              checked={lumbarPlexus}
              onChange={() => {
                setLumbarPlexus((lumbarPlexus) => !lumbarPlexus);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="lumbarPlexus">
              Lumbar Plexus
            </label>
            <br />
  
            <input
              type="checkbox"
              id="paravertebral"
              className={checkboxstyle}
              checked={paravertebral}
              onChange={() => {
                setParavertebral((paravertebral) => !paravertebral);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="paravertebral">
              Paravertebral
            </label>
            <br />
  
            <input
              type="checkbox"
              id="quadratusLumborum"
              className={checkboxstyle}
              checked={quadratusLumborum}
              onChange={() => {
                setQuadratusLumborum((quadratusLumborum) => !quadratusLumborum);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="quadratusLumborum">
              QL
            </label>
            <br />
  
            <input
              type="checkbox"
              id="transversusAbdominalPlane"
              className={checkboxstyle}
              checked={transversusAbdominalPlane}
              onChange={() => {
                setTransversusAbdominalPlane(
                  (transversusAbdominalPlane) => !transversusAbdominalPlane
                );
              }}
            />
            <label
              className={checkboxlabelstyle}
              htmlFor="transversusAbdominalPlane"
            >
              TAP
            </label>
            <br />
          </div>
        </div>
  
        <div className="pl-4">
          <label className="text-xs text-blue-500" htmlFor="otherblocks">
            Other
          </label>
          <div id="otherblocks">
            <input
              type="checkbox"
              id="retrobulbar"
              className={checkboxstyle}
              checked={retrobulbar}
              onChange={() => {
                setRetrobulbar((retrobulbar) => !retrobulbar);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="retrobulbar">
              Retrobulbar
            </label>
            <br />
  
  
            <input
              type="checkbox"
              id="other"
              className={checkboxstyle}
              checked={other}
              onChange={() => {
                setOther((other) => !other);
              }}
            />
            <label className={checkboxlabelstyle} htmlFor="other">
              Other
            </label>
            <br />
          </div>
        </div>
      </div>
    </>
  );

  const tabs = [
    { label: 'Anesthesia', content: anesTab},
    { label: 'Nerve Blocks', content: blockTab },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].label);



  return (
    <div id="background" className="p-2 h-full bg-slate-800">
      <div className="flex justify-between items-center text-xs text-white font-bold px-2">
  <span>&#128137; ACGME Anesthesia Case Log Helper</span>
  <span>Updated 4/19/25 by jamescho7</span>
</div>

      {active && (
        <>
            <div className="flex flex-row justify-start items-end gap-4 px-2">
          <div className="flex flex-col items-start">
            <label
              htmlFor="date-picker"
              className="text-xs text-blue-500 mb-1"
            >
              Case Date
            </label>
            <input
              className="bg-transparent border-b-2 text-xs"
              type="date"
              id="date-picker"
              name="current-date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col">
            <SimpleDropdown
              label="Patient Age"
              options={[
                "<3 mos.",
                "3 mos to 2 years",
                "3 to 11 years",
                "12 to 64 years",
                "65+",
              ]}
              value={ageCategory}
              setValue={setAgeCategory}
            />
          </div>
        </div>

          <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          <div id="form-buttons" className="bg-slate-900 pl-4 pb-2">
  <button
    onClick={() => {
      sendMessage(false);
    }}
    className="px-3 py-1 border-2 rounded-md text-xs mr-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
    id="fill-button"
  >
    Fill
  </button>
  <button
    onClick={() => {
      sendMessage(true);
    }}
    className="px-3 py-1 mr-2 border-2 rounded-md text-xs border-amber-500 bg-amber-500 hover:bg-amber-400 hover:border-amber-400 text-black"
    id="submit-button"
  >
    Fill and Submit
  </button>

  <button
    onClick={() => {
      reset();
    }}
    className="px-3 py-1 border-2 rounded-md text-xs border-amber-500 bg-amber-500 hover:bg-amber-400 hover:border-amber-400 text-black"
    id="reset-button"
  >
    Reset Values
  </button>
</div>
        </>
      )}
      {!active && (
        <div className="mx-2">
          <h2 className="mt-4">
            You must be logged into the ACGME case entry site to continue.
          </h2>
          <button
            onClick={() => {
              chrome.tabs.create({
                url: "https://apps.acgme.org/ads/CaseLogs/CaseEntry/Insert",
                selected: true,
                active: true,
              });
            }}
            className="text-xs bg-red-500 hover:bg-red-400 active:bg-red-500 rounded-md mt-1 p-2"
          >
            Open ACGME Site
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
