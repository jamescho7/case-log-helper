/*global chrome*/

import React, { useState, useEffect } from "react";
import SimpleDropdown from "./components/SimpleDropdown";
import SimpleSwitch from "./components/SimpleSwitch";

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
  const [airway, setAirway] = useStickyState("Direct Oral", "airway");
  const [masked, setMasked] = useStickyState("Yes", "masked");

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

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    if (tabs[0].url) {
      setCurrentUrl(tabs[0].url);
    }
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let url = tab.url;
    if (url) {
      setCurrentUrl(url);
    }
  });

  const reset = () => {
    setDate(new Date().toDateInputValue());
    setAgeCategory("12 to 64 years");
    setAsaClass("3");
    setIsEmergency("No");
    setAnesType("GA");
    setAirway("Direct Oral");
    setMasked(true);
    setCategory("Default");
    setSubcategory("None");
    setUltrasound(false);
    setAline(false);
    setCline(false);
    setPacath(false);
    setCsf(false);
    setEpm(false);
    setTee(false);
  };

  useEffect(() => {
    if (asaClass == "6") {
      setIsEmergency("No");
    }
  }, []);

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
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, {
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
        airway,
        masked: masked == "Yes",
        category,
        subcategory,
        ultrasound,
        aline,
        cline,
        pacath,
        csf,
        epm,
        tee,
        submit: doSubmit,
      });
    });
  };

  const active = currentUrl.includes("apps.acgme.org/");

  return (
    <div id="background" className="p-2 h-full bg-slate-800">
      <h1 className="inline text-sm text-white font-bold">
        &#128137;ACGME Anesthesia Case Log Helper
      </h1>
      <h2 className="text-white italic text-xs">Created by jamescho7</h2>
      <h2 className="text-white italic text-xs">Updated 6/15/24</h2>

      {active && (
        <>
          <div className="pt-2 flex flex-col items-start">
            <label className="text-xs text-blue-500" htmlFor="date-picker">
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

          <div className="flex flex-col pr-2">
            <SimpleDropdown
              label="Age"
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

          <div className="flex">
            <div className="flex flex-col pr-2">
              <SimpleDropdown
                label="ASA Class"
                options={
                  isEmergency == "No"
                    ? ["1", "2", "3", "4", "5", "6"]
                    : ["1", "2", "3", "4", "5"]
                }
                suffix={isEmergency != "No" ? "E" : ""}
                value={asaClass}
                setValue={setAsaClass}
              />
            </div>
            <div className="flex flex-col pr-2">
              {asaClass != "6" && (
                <SimpleDropdown
                  label="Emergency?"
                  options={["No", "Trauma", "Non-Trauma"]}
                  value={isEmergency}
                  setValue={setIsEmergency}
                />
              )}
            </div>
            <div className="flex flex-col pr-2">
              {asaClass != "6" && (
                <SimpleDropdown
                  label="Difficult Airway?"
                  options={["No", "Anticipated", "Unanticipated"]}
                  value={isDifficultAirway}
                  setValue={setIsDifficultAirway}
                />
              )}
            </div>

          </div>

          <div className="flex">
            <div className="flex flex-col">
                <SimpleDropdown
                  label="Primary Anesthesia"
                  options={[
                    "GA",
                    "MAC",
                    "Spinal",
                    "Epidural",
                    "CSE",
                    "GA + Epidural",
                  ]}
                  value={anesType}
                  setValue={setAnesType}
                />
              </div>
          </div>

          <div className="flex">
            <div className="flex flex-col items-start pr-2">
              <SimpleDropdown
                label="Masked?"
                options={["Yes", "No"]}
                value={masked}
                setValue={setMasked}
              />
            </div>
            <div className="flex flex-col">
              <SimpleDropdown
                label="Airway"
                options={
                  anesType == "MAC"
                    ? ["Natural"]
                    : [
                        "Natural",
                        "Direct Oral",
                        "Indirect Oral",
                        "LMA",
                        "Direct Nasal",
                        "Indirect Nasal",
                      ]
                }
                value={airway}
                setValue={setAirway}
              />
            </div>
          </div>

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
              <label
                className="text-xs text-blue-500"
                htmlFor="specialmonitors"
              >
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

          <div id="form-buttons" className="mt-2.5">
            <button
              onClick={() => {
                sendMessage(false);
              }}
              className="px-3 py-1 border-2 rounded-md text-xs mr-2"
              id="fill-button"
            >
              Fill
            </button>
            <button
              onClick={() => {
                sendMessage(true);
              }}
              className="px-3 py-1 mr-2 border-2 rounded-md text-xs hover:border-blue-500 border-blue-600 bg-blue-600 hover:bg-blue-500"
              id="submit-button"
            >
              Fill and Submit
            </button>

            <button
              onClick={() => {
                reset();
              }}
              className="px-3 py-1 border-2 rounded-md text-xs hover:border-blue-500 border-blue-600 bg-blue-600 hover:bg-blue-500"
              id="submit-button"
            >
              Reset Values
            </button>
          </div>
        </>
      )}
      {!active && (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
