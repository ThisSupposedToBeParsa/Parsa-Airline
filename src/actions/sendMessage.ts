"use server";

import { DataType } from "@/types/types";
import { prisma } from "../utils/db";
import { SetStateAction } from "react";

interface Params {
  name: string;
  email: string;
  message: string;
  displayName?: string;
}

export const sendMessageToDB = async ({
  email,
  message,
  name,
  displayName,
}: Params) => {
  try {
    if (displayName !== undefined) {
      await fetch("http://admin-parsaairline.vercel.app/api/messages/create", {
        headers: {
          "Content-Type": "application",
          "X-Api-Key": process.env.API_KEY!,
          "Data-Message": message,
          "Data-Email": email,
          "Data-DisplayName": displayName,
          "Data-Name": name,
        },
      });
    }

    if (displayName === undefined) {
      await fetch("http://admin-parsaairline.vercel.app/api/messages/create", {
        headers: {
          "Content-Type": "application",
          "X-Api-Key": process.env.API_KEY!,
          "Data-Message": message,
          "Data-Email": email,
          "Data-DisplayName": "",
          "Data-Name": name,
        },
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllMessagesFromDB = async () => {
  try {
    return await prisma.message.findMany();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function getLatestMessages(amount: number) {
  try {
    const data = await fetch(
      `http://admin-parsaairline.vercel.app/api/messages/latest/${amount}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.API_KEY!,
        },
        next: { revalidate: 1 },
      }
    );

    if (!data.ok) return;

    const dataFound = (await data.json()) as DataType[];

    return dataFound as DataType[];
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const getMessageFromDB = async (id: number) => {
  const data = await prisma.message.findFirst({
    where: { id: id },
  });

  return data;
};
