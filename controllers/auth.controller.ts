import { Request, Response } from "express";
import { UserDocument, userModel } from "../models/user.model";
import bcrypt from "bcrypt";

export const Resgisteration = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      return res.status(200).send({
        statusCode: 200,
        msg: "User Already Exist",
      });
    }

    const password = await bcrypt.hash(req.body.password, 12);

    const userRegis: UserDocument = await userModel.create({
      ...req.body,
      password,
    });

    if (userRegis) {
      res.status(201).send({
        statusCode: 201,
        msg: "User Registered Successfully",
      });
    } else {
      res.json({
        statusCode: 201,
        msg: "User Registered Successfully",
      });
    }
  } catch (error: any) {
    res.status(500).send({ statusCode: 500, err: "Internal Server Error" });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const valid = await bcrypt.compare(password, user.password.toString());

      if (valid) {
        res.status(200).send({
          statusCode: 200,
          msg: "Loggin successfully",
        });
      } else {
        res.status(400).send({
          statusCode: 400,
          msg: "Invalid email and password",
        });
      }
    } else {
      res.status(400).send({
        statusCode: 400,
        err: "User not found",
      });
    }
  } catch (err: any) {
    res.json({
      statusCode: 500,
      err: "Internal Server Error",
    });
  }
};

export const ChangePassword = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (user) {
      const pass = await bcrypt.compare(
        req.body.current,
        user.password.toString()
      );

      if (pass) {
        const password = await bcrypt.hash(req.body.password, 12);

        const changed = await userModel.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: { password : password } }
        );

        if(changed){
            res.status(201).send({
                statusCode : 201,
                msg : "Password changed successfully"
            })
        }

      } 
      else {
        res.status(400).send({
          statusCode: 400,
          err: "Incorrect password",
        });
      }
    } else {
      res.status(400).send({
        statusCode: 400,
        err: "User not found",
      });
    }
  } catch (error: any) {
    res.status(500).send({
      statusCode: 500,
      error: error.message,
    });
  }
};
