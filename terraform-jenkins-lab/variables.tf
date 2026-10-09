
variable "aws_region" {
  default = "us-east-1"
}

variable "ami_id" {
  default = "ami-0b6d9d3d33ba97d99"
}

variable "instance_type" {
  default = "t3.micro"
}

variable "key_name" {
  default = "jenkins-ansible"
}

variable "security_group_id" {
  default = "sg-0466d76dd24447b37"
}

