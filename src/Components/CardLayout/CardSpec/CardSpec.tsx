/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import classNames from "classnames";
import "./CardSpec.scss";
import { SelectedPhone } from "../../../types/SelectedPhone";

interface CardSpecProps {
  spec: SelectedPhone;
  isTrimmed: boolean;
}

type typeSpecPropTitle = {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacity: string;
  camera: string;
  zoom: string;
  cell: string;
};

const specPropTitle = {
  screen: "Screen",
  resolution: "Resolution",
  processor: "Processor",
  ram: "RAM",
  capacity: "Build in memory",
  camera: "Camera",
  zoom: "Zoom",
  cell: "Cell"
};

const propsOfItem = ["screen", "resolution", "processor", "ram", "capacity", "camera", "zoom", "cell"];

export const CardSpec: React.FC<CardSpecProps> = ({ spec, isTrimmed }) => {
  const specKeys = Object.keys(spec);

  const preparedSpecOrder = {
    screen: spec.screen,
    resolution: spec.resolution,
    processor: spec.processor,
    ram: spec.ram,
    capacity: spec.capacity,
    camera: spec.camera,
    zoom: spec.zoom,
    cell: spec.cell
  };

  let renderFields: string[];

  switch (true) {
    case specKeys.length > 13 && isTrimmed:
      renderFields = propsOfItem.slice(0, 4);
      break;
    case specKeys.length > 13 && !isTrimmed:
      renderFields = [...propsOfItem];
      break;
    case specKeys.length <= 13:
      renderFields = propsOfItem.slice(0, 3);
      break;
    default:
      renderFields = [];
      break;
  }

  return (
    <div className={classNames("spec", { full__spec: !isTrimmed })}>
      {Object.entries(preparedSpecOrder)
        .filter((specEntrie) => renderFields.includes(specEntrie[0]))
        .map((specEntrie) => (
          <div className="spec__rows" key={specEntrie[0]}>
            <>
              <div className="spec__rows-title">{specPropTitle[specEntrie[0] as keyof typeSpecPropTitle]}</div>
              {Array.isArray(specEntrie[1]) ? (
                <div className="spec__rows-value">{specEntrie[1].join(", ")}</div>
              ) : (
                <div className="spec__rows-value">{specEntrie[1]}</div>
              )}
            </>
          </div>
        ))}
    </div>
  );
};
