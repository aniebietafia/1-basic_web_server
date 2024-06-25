import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import axios from "axios";

/**
 * @description controller to log the ip address of the client
 * @param req Request
 * @param res Response
 * @returns void
 * @example logIpAddress(req, res);
 * @since 1.0.0
 * @version 1.0.0
 * @access public
 * @alias logIpAddress
 */

class TaskController {
  public logIpAddress(req: Request, res: Response): void {
    const clientIp =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "Unknown IP";

    const geoLocationUrl = `https://ipinfo.io/${clientIp}/geo`;

    try {
      axios.get(geoLocationUrl).then((response) => {
        const location = response.data;
        res.status(StatusCodes.OK).json({
          ip: `You're requesting for this resource from IP address: ${clientIp}`,
          geoLocation: {
            ip: location.ip,
            city: location.city,
            region: location.region,
            country: location.country,
            timezone: location.timezone,
            long: location.loc.split(",")[0],
            lat: location.loc.split(",")[1],
          },
        });
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching the IP address",
      });
    }
  }
}

export const taskController = new TaskController();
