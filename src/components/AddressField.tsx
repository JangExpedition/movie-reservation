import { useState } from "react";
import "./AddressField.style.scss";
import { DaumAddress } from "../types/AddressFieldTypes";

const AddressField = () => {
  const [address1, setAddress1] = useState("");

  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: (data: DaumAddress) => {
        console.log(data);
        setAddress1(`(${data.sigunguCode}) ${data.roadAddress}`);
      },
    }).open();
  };

  return (
    <div className="AddressField">
      <label htmlFor="address1">주소</label>
      <div className="find-address">
        <input
          id="address1"
          name="address1"
          type="text"
          value={address1}
          placeholder="주소를 검색해 주세요"
          className="default-bg"
          readOnly
        />
        <button className="search-address" onClick={searchAddress} type="button">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>

      <label htmlFor="address2">상세 주소</label>
      <input
        id="address2"
        name="address2"
        type="text"
        placeholder="상세 주소"
        className="default-bg"
      />
    </div>
  );
};

export default AddressField;
