require 'rubygems'
require 'bundler/setup'

Bundler.require(:default)

class CliApp < Thor 

  desc "new DIRECTORY", "Create a new project with Build Process"

  def new
    # TODO: Implement update method to setup a new project 
  end

  desc "migrate DIRECTORY", "Migrate a project to Build Process"

  def migrate(dirOfProject)
    puts "#{dirOfProject}"
  end

  desc "update DIRECTORY", "Update Build Process in a project already using it"

  def update
    # TODO: Implement update method to add changes to project
  end
end

CliApp.start(ARGV)
