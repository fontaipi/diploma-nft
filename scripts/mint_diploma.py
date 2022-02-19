from scripts.useful_script import get_account
from metadata.sample_metadata import metadata_template
from brownie import Diploma, network
import json
import requests
from requests.auth import HTTPBasicAuth
from pathlib import Path
import os


def main():
    account = get_account()
    print(network.show_active())
    diploma = Diploma[len(Diploma) - 1]
    token_id = diploma.tokenCounter()

    metadata_file_name = f"./metadata/{network.show_active()}/{token_id}-jdupon.json"

    if Path(metadata_file_name).exists():
        print(f"{metadata_file_name} already exist")
    else:
        print(f"Creating metadata file : {metadata_file_name}")
        diploma_metadata = metadata_template
        diploma_metadata["diploma_name"] = "Master MIAGE"
        diploma_metadata["school_name"] = "Université Catholique de Lille"
        diploma_metadata["year_of_graduation"] = "2022"
        diploma_metadata["code"] = "ABCDEFGIJ1234"
        diploma_metadata["description"] = "..."
        image_path = "./img/Denis-TRUFFAUT-diplome-Master-MIAGE.png"
        image_uri = upload_to_ipfs(image_path)
        diploma_metadata["image"] = image_uri
        diploma_metadata["graduate"]["name"] = "Denis"
        diploma_metadata["graduate"]["lastname"] = "TRUFFAUT"
        diploma_metadata["graduate"]["imdate_of_birthage"] = "15/02/1998"
        diploma_metadata["graduate"]["place_of_birth"] = "Lille"
        with open(metadata_file_name, "w") as file:
            json.dump(diploma_metadata, file)

    diploma_ipfs = upload_to_ipfs(metadata_file_name)
    transaction = diploma.awardDiploma(
        "0x810B6B042e90aaf5FD699995998F0565D602EBa5",
        diploma_ipfs,
        {"from": account},
    )
    transaction.wait(1)


def upload_to_ipfs(filepath):
    with Path(filepath).open("rb") as fp:
        image_binary = fp.read()
        ipfs_url = "https://ipfs.infura.io:5001"
        endpoint = "/api/v0/add"
        response = requests.post(
            ipfs_url + endpoint,
            files={"file": image_binary},
            auth=HTTPBasicAuth(
                os.getenv("IPFS_INFURA_PROJECT_ID"),
                os.getenv("IPFS_INFURA_PROJECT_SECRET"),
            ),
        )
        ipfs_hash = response.json()["Hash"]
        filename = filepath.split("/")[-1:][0]
        image_uri = f"https://ipfs.io/ipfs/{ipfs_hash}?filename={filename}"
        print(image_uri)
        return image_uri
