provider "aws" {
  region = local.region
  profile = local.profile
}

terraform {
  required_version = "1.11.2"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>5.54.1"
    }
  }
}