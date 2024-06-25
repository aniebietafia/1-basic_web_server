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
  private clientIp: string | string[];
  private geoLocationUrl: string;

  constructor() {
    this.clientIp = "";
    this.geoLocationUrl = `https://ipinfo.io/${this.clientIp}/geo`;
  }

  public logIpAddress(req: Request, res: Response): void {
    this.clientIp =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "Unknown IP";

    try {
      axios.get(this.geoLocationUrl).then((response) => {
        res.status(StatusCodes.OK).json({
          ip: `You're requesting for this resource from IP address: ${this.clientIp}`,
          geoLocation: response.data,
        });
      });
    } catch (error) {}
  }
}

export const taskController = new TaskController();
