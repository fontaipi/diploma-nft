import pytest
from brownie import accounts, network, Diploma
from scripts.useful_script import (
    get_account,
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
)


def test_can_create_diploma():
    # Arrange
    account = get_account()
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing")
    diploma_contract = Diploma.deploy(
        {"from": get_account()},
    )
    # Act
    tx = diploma_contract.awardDiploma(
        account,
        "https://ipfs.io/ipfs/QmdS8Ay2q7rRGjUacP9viofZKDZLQnbNJrRwWAVVFFPq6n?filename=0-jdupon.json",
        {"from": account},
    )
    tx.wait(1)
    # Assert
    assert diploma_contract.tokenCounter() > 0
    assert diploma_contract.balanceOf(account.address) > 0
