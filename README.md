# CustomerLoyaltyProgram
Hyperledger fabric 

-- This is to install the bna file.... 
composer network install --card PeerAdmin@hlfv1 --archiveFile citi-network@0.0.1.bna

-- This is to start BNA file...
composer network start --networkName citi-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

-- Import card...
composer card import --file networkadmin.card

This is to ping the network... 
composer network ping --card admin@citi-network
