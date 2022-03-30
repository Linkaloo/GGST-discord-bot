import Discord from "discord.js";
import axios from "axios";

export const getPlayers = async (character) => {
  if (character) {
    try {
      const request = await axios({
        method: "GET",
        url: `${process.env.BASE}/players/${character}`,
      });
      return request.data;
    } catch (err) {
      return err;
    }
  }

  try {
    const request = await axios({
      method: "GET",
      url: `${process.env.BASE}/players`,
    });

    return request.data;
  } catch (err) {
    return err;
  }
};

export const addPlayer = async (body) => {
  try {
    const request = await axios({
      method: "POST",
      url: `${process.env.BASE}/players`,
      data: body,
    });

    return request.data;
  } catch (err) {
    return err;
  }
};
