import "./Dropdown.scss";

interface Props {
  list?: string[];
}

const list = ["123", "456", "789", "qwerty"];

export const Dropdown: React.FC<Props> = () => (
  <select className="dropdown">
    {list.map((item) => (
      <option value={item}>{item}</option>
    ))}
  </select>
);
