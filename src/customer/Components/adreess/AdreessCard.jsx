import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div>
      {/* <h1 className="text-lg font-semibold py-4">Delivery Adress</h1> */}
      <div className="space-y-1">
        <p className="font-semibold">{address[0]}</p>
        <p>{`${address[1]}`}</p>
        <p>{`${address[2]}`}</p>
        <p>{`${address[3]}`}</p>

        {/* <p>banglore</p> */}

        <div className="space-y-2">
          <p className="font-semibold">Phone Number</p>
          {/* <p>{address?.mobile}</p> */}
          <p>+91 9847485584</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
