const aws = require("@pulumi/aws");

let size = "t2.micro";     // t2.micro is available in the AWS free tier
let ami  = "ami-0ff8a91507f77f867"; // AMI for Amazon Linux in us-east-1 (Virginia)

let group = new aws.ec2.SecurityGroup("webserver-secgrp", { 
    ingress: [
        { protocol: "tcp", fromPort: 2222, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
    ],
});

let server = new aws.ec2.Instance("webserver-www", {
    instanceType: size,
    securityGroups: [ group.name ], // reference the security group resource above
    ami: ami,
});

exports.publicIp = server.publicIp;
exports.publicHostName = server.publicDns;
