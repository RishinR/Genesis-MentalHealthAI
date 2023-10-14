import React from "react";
import Feature from "./Feature";

function Experience() {
  const content = ["Our cutting-edge AI chatbot is more than just a program; it's a friendly, understanding, and non-judgmental friend who's here to listen, support, and empower you.", "Watch your journey to better mental health unfold with our progress-tracking tools. Celebrate your victories, both big and small.", "Life doesn't adhere to schedules, and neither do we. Whether it's a sunny morning or a starry night, MindWave is always here for you, whenever you need it."]
  return (
    <div className="experience flex flex-col items-center justify-start px-[5rem] bg-[#020917] h-[60rem] pt-[18rem] mt-[-10rem] relative z-[2] rounded-b-[5rem]">
      {/* titld icon */}
      <img src={require("../../img/Path 318.png")} alt="" className="w-[5rem]" />
      {/* heading */}
      <div className="headline mt-7 flex flex-col items-center text-[2rem]">
        <span>Your trusted companion</span>
        <span>
          <b>Guiding you through the waves of life's challenges</b>
        </span>
      </div>
      {/* features  */}
      <div className="feature flex items-center justify-around mt-[6rem] w-[100%]">
        <Feature icon="Group 2" title="Mental Health Partner" text={content[0]}/>
        <Feature icon="Path 318" title="Progress Track " text={content[1]} />
        <Feature icon="Group 4" title="Available 24/7" text = {content[2]} />
      </div>
    </div>
  );
}

export default Experience;
