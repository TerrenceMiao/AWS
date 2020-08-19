import { StackProps, Stack, Construct, Duration } from '@aws-cdk/core';
import { DatabaseInstance, DatabaseInstanceEngine, StorageType } from '@aws-cdk/aws-rds';
import { ISecret, Secret } from '@aws-cdk/aws-secretsmanager';
import { InstanceClass, InstanceSize, InstanceType, Peer, SubnetType, Vpc } from "@aws-cdk/aws-ec2";

interface RDSStackProps extends StackProps {
  vpc: Vpc;
}

export class RDSStack extends Stack {

	readonly secret: ISecret;
	readonly sqlInstance: DatabaseInstance;

	constructor(scope: Construct, id: string, props: RDSStackProps) {
		super(scope, id, props);

		// this.secret = new Secret(this, 'testdbSecret', {
		//   generateSecretString: {
		//     secretStringTemplate: JSON.stringify({ username: 'admin' }),
		//     generateStringKey: 'adminPwd12345678'
		//   }
		// });

		this.secret = new Secret(this, "MySQL Password", {
			generateSecretString: {
				passwordLength: 16,
				excludeCharacters: '"@/\\;'
			}
		});

		// this.secret = Secret.fromSecretAttributes(this, 'testdbSecret', {
		//   secretArn: 'arn:aws:secretsmanager:ap-southeast-2:123456789012:secret:testdbSecret-A9I8jp',
		// });

		this.sqlInstance = new DatabaseInstance(this, 'MySQL Instance', {
			// engine: DatabaseInstanceEngine.MYSQL,
			// instanceClass: InstanceType.of(InstanceClass.T2, InstanceSize.SMALL),
			// vpc: props.vpc,
			// vpcPlacement: {subnetType: SubnetType.ISOLATED},
			// storageEncrypted: true,
			// multiAz: false,
			// autoMinorVersionUpgrade: false,
			// allocatedStorage: 20,
			// storageType: StorageType.GP2,
			// backupRetention: Duration.days(3),
			// deletionProtection: false,
			// masterUsername: 'admin',
			// databaseName: 'Reporting',
			// masterUserPassword: this.secret.secretValue,
			// port: 3306
			engine: DatabaseInstanceEngine.MYSQL,
			instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.SMALL),
			instanceIdentifier: 'testdb',
			vpc: props.vpc,
			vpcPlacement: { subnetType: SubnetType.ISOLATED },
			allocatedStorage: 5,
			masterUsername: 'admin',
			masterUserPassword: this.secret.secretValue,
			deletionProtection: false,
		});
	}
}
