import axios from "axios";

export const getCharacterFrameData = async (characterName) => {
  const request = await axios({
    method: "GET",
    url: `${process.env.BASE}/attacks/${characterName}`,
  });

  return request.data;
};

export const updateFrameData = async (query) => {

};
