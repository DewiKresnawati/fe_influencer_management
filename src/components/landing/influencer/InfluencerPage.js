import React, { useState } from "react";
import Heroinf from "./Heroinf";
import InfluencerList from "./InfluencerList";

function InfluencerPage() {
  const [filter, setFilter] = useState("Home");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <Heroinf onFilterChange={handleFilterChange} />
      <InfluencerList filter={filter} />
    </div>
  );
}

export default InfluencerPage;