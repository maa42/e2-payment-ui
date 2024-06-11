import classes from "./Codegen.module.css";
import React, { useState, useEffect } from "react";
import { S3 } from "aws-sdk";
import AWS from "aws-sdk";

const s3 = new S3();

const S3FileViewer = () => {
    const [files, setFiles] = useState([]);
    const [code, setCode] = useState("");

    AWS.config.update({
        accessKeyId: "",
        secretAccessKey: "",
    });
    const s3 = new AWS.S3({
        params: { Bucket: "e2-codegen-bucket" },
        region: "us-east-1",
    });

    useEffect(() => {
        s3.listObjects({ Bucket: "e2-codegen-bucket" }).promise().then((data) => {
            setFiles(data.Contents);
        });
    }, []);

    const handleFileClick = (file) => {
        s3.getObject({ Bucket: "e2-codegen-bucket", Key: file.Key }).promise().then((data) => {
            setCode(data.Body.toString());
        });
    };

    return (
        <section className={classes.viewer}>
            <h2>S3 Code Viewer</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.Key} onClick={() => handleFileClick(file)}>
                        {file.Key}
                    </li>
                ))}
            </ul>
            <pre>{code}</pre>
        </section>
    );
};
export default S3FileViewer;
