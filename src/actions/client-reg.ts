"use server";

import db from "@/lib/prisma";

export async function getServices() {
  // Get all services list
  try {
    const services = await db.service.findMany({
      orderBy: {
        title: "asc",
      },
      select: {
        id: true,
        title: true,
      },
    });
    console.log(services);
    if (services.length < 1) {
      return {
        status: 404,
        message: "No services found",
        services,
      };
    }
    return {
      status: 200,
      services,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
      services: [],
    };
  }
}

export async function getSkillsUnderService(serviceId: string) {
  // Get all skills under a service
  try {
    const skills = await db.skill.findMany({
      where: {
        serviceId,
      },
      orderBy: {
        title: "asc",
      },
    });
    if (skills.length < 1) {
      return {
        status: 404,
        message: "No skills found",
      };
    }
    return {
      status: 200,
      skills,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
}
