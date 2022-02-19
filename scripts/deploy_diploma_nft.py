from brownie import Diploma
from scripts.useful_script import get_account


def deploy_diploma_nft():
    account = get_account()
    diploma = Diploma.deploy({"from": account}, publish_source=True)


def main():
    deploy_diploma_nft()
