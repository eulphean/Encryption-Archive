//
// Copyright (c) 2013 Christopher Baker <https://christopherbaker.net>
//
// SPDX-License-Identifier:    MIT
//


#pragma once


#include "ofMain.h"
#include "ofxESCPOS.h"
#include "ofxOSC.h"

#define PORT 8081

using namespace ofx;

class ofApp: public ofBaseApp
{
public:
    void setup() override;
    void update() override; 
    void draw() override;

    void keyPressed(int key) override;

    ESCPOS::DefaultSerialPrinter printer;
    ofxOscReceiver receive;
};
