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

export async function getAllIndustries() {
  // Get all industries list
  try {
    const industries = await db.industry.findMany({
      orderBy: {
        title: "asc",
      },
      select: {
        id: true,
        title: true,
      },
    });
    if (industries.length < 1) {
      return {
        status: 404,
        message: "No industries found",
        industries,
      };
    }
    return {
      status: 200,
      industries,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
      industries: [],
    };
  }
}

export async function getAllJobPosition() {
  // Get all job position list
  try {
    const positions = await db.jobPosition.findMany({
      orderBy: {
        title: "asc",
      },
      select: {
        id: true,
        title: true,
      },
    });
    if (positions.length < 1) {
      return {
        status: 404,
        message: "No job position found",
        positions,
      };
    }
    return {
      status: 200,
      positions,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
      positions: [],
    };
  }
}

export async function uniqueEmail(email: string) {
  try {
    const emailExists = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (emailExists) {
      return {
        status: 409,
        message: "Email already exists",
      };
    }
    return {
      status: 200,
      message: "Email is unique",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
}
