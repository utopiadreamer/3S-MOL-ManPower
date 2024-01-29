import {
  DropdownMenuItemType,
  IDropdownOption,
  Icon,
  Label,
} from "@fluentui/react";
import { FC, useEffect, useRef, useState } from "react";
import "./SearchableDropdown.scss";

export interface Props {
  options: IDropdownOption[];
  label: string;
  id: string;
  selectedKey: string;
  onChange: (key?: string | null, text?: string) => void;
}

export const SearchableDropdown: FC<Props> = (props: Props) => {
  const { options, label, id, selectedKey, onChange } = props;
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option: { [x: string]: any }) => {
    setQuery(() => "");
    onChange(option.key, option.text);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e: any) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedKey)
      return options.filter((i) => i.key === selectedKey)[0].text;

    return "";
  };

  const filter = (options: any[]) => {
    return options.filter(
      (option: IDropdownOption) =>
        option.text?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        option.itemType === DropdownMenuItemType.Header ||
        option.data === "SubHeader"
    );
  };

  const getItemClassname = (option: IDropdownOption) => {
    if (option.data === "SubHeader") return "headerOption subHeader";
    else if (option.itemType === DropdownMenuItemType.Header)
      return "headerOption";
    else return "itemOption";
  };

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <Label>{label}</Label>
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              onChange(null);
            }}
            onClick={toggle}
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {filter(options).map((option: IDropdownOption, index: any) => {
          return (
            <div
              onClick={() =>
                option.itemType === DropdownMenuItemType.Header
                  ? undefined
                  : selectOption(option)
              }
              className={`option ${
                option.key === selectedKey ? "selected" : ""
              } ${getItemClassname(option)}`}
              key={`${id}-${index}`}
            >
              <Icon iconName="CaretLeftSolid8" /> {option.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
