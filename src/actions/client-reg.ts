"use server";

import db from "@/lib/prisma";
import { ClientRegProps } from "@/schemas/client-reg";

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

export async function onClientRegistration(data: ClientRegProps) {
  try {
    // validate unique email
    const existingEmail = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingEmail) {
      return {
        status: 409,
        message: "Email already exists",
      };
    }

    // validate unique Phone number
    const existingPhoneNumber = await db.user.findUnique({
      where: {
        phone: data.phoneNumber,
      },
    });

    if (existingPhoneNumber) {
      return {
        status: 409,
        message: "Phone number already exists",
      };
    }
    // create company
    const company = await db.company.create({
      data: {
        name: data.companyName,
        size: data.companySize,
        industryId: data.industry,
        logo: data.companyLogo || "",
      },
    });

    // validate company creation
    if (!company) {
      return {
        status: 500,
        message: "An error occured while creating company",
      };
    }

    // Create user with proper data
    const user = await db.user.create({
      data: {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phone: data.phoneNumber,
        jobPositionId: data.position,
        companyId: company.id,
        serviceId: data.service,
        avatar: data.avatar || "",
      },
    });

    // TODO: Create OTP & Send it to user's email

    // validate user creation
    if (!user) {
      // delete company if user creation fails
      await db.company.delete({
        where: {
          id: company.id,
        },
      });
      return {
        status: 500,
        message: "An error occured while creating user",
      };
    }

    return {
      status: 200,
      message: "Registration successful. Check your email for OTP",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
}
