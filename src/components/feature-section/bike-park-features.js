import React from "react";
import { BikeParkFeature } from "../feature-content/bike-park-feature";
import "./bike-park-features.scss";
import { PageLoader } from "../animation-bike/page-loader";

export const BikeParkFeatures = () => {
  const featuresList = [
    {
      id: "1",
      title: "Bike Park",
      description:
        "This route is worth riding MANY times. From here the trail narrows and skirts a rocky hillside. Great trail, with amazing views, but may see a lot of traffic. IMO it is a better ride to turn around and follow the same trail down.",
      resourceUrl: "",
      icon: "",
    },
    {
      id: "2",
      title: "Bike Park",
      description:
        "At the bottom the trail joins Hide and Seek above a major creek crossing. Jewel of the Amasa Back area, relatively new to the other trails. Only about 25% of the trail is good to ride. This created a reroute of the single track.",
      resourceUrl: "",
      icon: "",
    },
    {
      id: "3",
      title: "Bike Park",
      description:
        "A long, long, did I mention long? Fire road that circles Mauna Kea. I discovered this trail while out with my friend one day. Use some caution in the corners here. Don't miss this trail!",
      resourceUrl: "",
      icon: "",
    },
    {
      id: "4",
      title: "Bike Park",
      description:
        "Sadly, a better trail in this same zone (Barney Lake) is designated wilderness and is therefore 'unlawful' to ride. This is a legitimate expert-level trail, but much of the difficulty can be mitigated by slowing down and picking your line carefully. Mostly dry with some small mud puddles. The decent is even more steep and exposed.",
      resourceUrl: "",
      icon: "",
    },
  ];

  return (
    <div className="bikepark-features">
      <h2 className="bikepark-features__title">
        Explore Woodwork Bike Park Features
      </h2>
      <div className="bikepark-features__grid">
        {featuresList.map((feature) => (
          <BikeParkFeature
            key={feature.id}
            title={feature.title}
            description={feature.description}
            resourceUrl={feature.resourceUrl}
            icon="fa-solid fa-bicycle"
          />
        ))}
      </div>
    </div>
  );
};
