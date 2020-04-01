#!/usr/bin/env ruby

require "rubygems"
require "bundler/setup"

Bundler.require(:default)

class Build_Process_App < Thor 

  desc "new DIRECTORY", "Create a new project with Build Process"

  def new
    # TODO: Implement update method to setup a new project 
  end

  desc "migrate DIRECTORY", "Migrate a project to Build Process"

  def migrate(dirOfProject)
    destination = dirOfProject
    source = "./build-process-files/."
    scripts = "/scripts"    
    styles = "/styles"    

    FileUtils.cp_r source, destination

    puts "Files copied from #{source} to #{destination}"

    if Dir.exist? "#{destination}#{styles}"
      puts "Styles folder already exists"
    else
      FileUtils.mkdir_p "#{destination}#{styles}"
      puts "Styles folder created"
    end

    if Dir.exist? "#{destination}#{scripts}"
      puts "Scripts folder already exists"
    else
      FileUtils.mkdir_p "#{destination}#{scripts}"
      puts "Scripts folder created"
    end
  end

  desc "update DIRECTORY", "Update Build Process in a project already using it"

  def update
    # TODO: Implement update method to add changes to project
  end
end

Build_Process_App.start(ARGV)
